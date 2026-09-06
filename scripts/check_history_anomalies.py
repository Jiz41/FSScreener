#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
history_history.json 検収用 異常検知スクリプト（読み取り専用）

検出内容:
1. 非日本語文字の混入（ハングル・ハングル字母・簡体字特有の字体等）
2. 「着」「歳」直前の数値のレンジ異常（着=1-18、歳=0-20の範囲外）

data/horse_history.json への書き込みは一切行わない。
"""

import json
import re
import sys
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "horse_history.json"

TARGET_FIELDS = ["achievements", "column"]

# --- 1. 非日本語文字検出 ---
# 許容範囲：ひらがな、カタカナ、漢字（CJK統合漢字＋拡張A＋互換）、
# 半角/全角英数字、一般的な記号・句読点、GI/JpnI等の競馬表記に使うアルファベット・数字・記号
ALLOWED_PATTERN = re.compile(
    r"[぀-ゟ"      # ひらがな
    r"゠-ヿ"       # カタカナ
    r"ㇰ-ㇿ"       # カタカナ拡張
    r"一-鿿"       # CJK統合漢字
    r"㐀-䶿"       # CJK拡張A
    r"豈-﫿"       # CJK互換漢字
    r"　-〿"       # CJK記号・句読点
    r"＀-￯"       # 全角英数記号
    r"0-9A-Za-z"           # 半角英数字
    r"\s"                  # 空白類
    r"、。・「」『』（）()【】〈〉《》〔〕［］,.!?！？:：;；\-—―～~/／%＋+×＊*'\"'"
    r"…‥※→←↑↓＝=＆&＃#＠@"
    r"─━│┃"          # 罫線
    r"“”‘’"          # カーブクォート
    r"Ⅰ-Ⅻⅰ-ⅻ"       # ローマ数字記号(GI/GII/GIII等の代替表記で使用)
    r"]"
)

# 禁止範囲として明示的に検出したい文字（ハングル・ハングル字母）
FORBIDDEN_RANGES = [
    (0xAC00, 0xD7A3, "ハングル音節"),
    (0x3130, 0x318F, "ハングル字母"),
    (0x1100, 0x11FF, "ハングル字母(Jamo)"),
]


def classify_char(ch: str) -> str:
    """明示的な禁止範囲に該当する文字の種別名を返す。該当なしなら空文字。"""
    cp = ord(ch)
    for start, end, label in FORBIDDEN_RANGES:
        if start <= cp <= end:
            return label
    return ""


def find_non_japanese_chars(text: str):
    """許容パターンに一致しない文字（かつ、できれば禁止範囲ラベルを付与）を位置付きで返す。"""
    results = []
    for idx, ch in enumerate(text):
        if ALLOWED_PATTERN.match(ch):
            continue
        label = classify_char(ch) or "未分類の非日本語文字"
        results.append((idx, ch, label))
    return results


# --- 2. 数値レンジ異常検出 ---
# 「着」の直前の数値（全角数字も考慮して事前に半角化してから処理する）
RANK_PATTERN = re.compile(r"(\d+)\s*着")
AGE_PATTERN = re.compile(r"(\d+)\s*歳")

RANK_MIN, RANK_MAX = 1, 18
AGE_MIN, AGE_MAX = 0, 20

ZEN_TO_HAN = str.maketrans("０１２３４５６７８９", "0123456789")


def find_range_anomalies(text: str):
    """(種別, 該当数値, マッチ文字列, 位置) のリストを返す。"""
    results = []
    normalized = text.translate(ZEN_TO_HAN)

    for m in RANK_PATTERN.finditer(normalized):
        val = int(m.group(1))
        if not (RANK_MIN <= val <= RANK_MAX):
            results.append(("着順", val, m.group(0), m.start()))

    for m in AGE_PATTERN.finditer(normalized):
        val = int(m.group(1))
        if not (AGE_MIN <= val <= AGE_MAX):
            results.append(("年齢", val, m.group(0), m.start()))

    return results


def check_record(name: str, record: dict):
    """1頭分のレコードを検査し、異常のリストを返す。"""
    issues = []

    for field in TARGET_FIELDS:
        text = record.get(field)
        if not isinstance(text, str) or not text:
            continue

        for idx, ch, label in find_non_japanese_chars(text):
            issues.append(
                f"[非日本語文字] field={field} 文字='{ch}'(U+{ord(ch):04X}, {label}) 位置={idx}"
            )

        for kind, val, matched, pos in find_range_anomalies(text):
            issues.append(
                f"[数値レンジ異常] field={field} 種別={kind} 値={val} 該当箇所='{matched}' 位置={pos}"
            )

    return issues


def main():
    if not DATA_PATH.exists():
        print(f"エラー: データファイルが見つかりません: {DATA_PATH}", file=sys.stderr)
        sys.exit(1)

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    total_horses = len(data)
    total_issues = 0
    horses_with_issues = 0

    for name, record in data.items():
        if not isinstance(record, dict):
            continue
        issues = check_record(name, record)
        if issues:
            horses_with_issues += 1
            total_issues += len(issues)
            print(f"■ {name}")
            for issue in issues:
                print(f"  - {issue}")
            print()

    print("=" * 60)
    print(f"検査対象: {total_horses}頭")
    if total_issues == 0:
        print("異常なし")
    else:
        print(f"異常検出: {horses_with_issues}頭 / 計{total_issues}件")


if __name__ == "__main__":
    main()
