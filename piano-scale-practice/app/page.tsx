"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Music, HelpCircle, CheckCircle, XCircle } from "lucide-react"

export default function PianoScalePractice() {
  // 12個のキーを配列で定義
  const keys = ["C", "D", "E", "F", "G", "A", "B", "B♭", "E♭", "A♭", "D♭", "G♭"]

  // 各キーのヒント値を定義
  const keyHints: Record<string, number> = {
    C: 0,
    G: 1,
    D: 2,
    A: 3,
    E: 4,
    B: 5,
    F: -1,
    "B♭": -2,
    "E♭": -3,
    "A♭": -4,
    "D♭": -5,
    "G♭": -6,
  }

  // ラジオボタンの選択肢
  const hintOptions = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

  // 各キーの表示回数を記録するステート
  const [keyCounts, setKeyCounts] = useState<Record<string, number>>(Object.fromEntries(keys.map((key) => [key, 0])))

  // 現在表示しているキー
  const [currentKey, setCurrentKey] = useState<string>("")

  // ヒントの表示状態
  const [showHint, setShowHint] = useState(false)

  // 選択された値
  const [selectedValue, setSelectedValue] = useState<string>("")

  // 選択が正解かどうか
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // 初回レンダリング時にランダムなキーを表示
  useEffect(() => {
    if (!currentKey) {
      const randomIndex = Math.floor(Math.random() * keys.length)
      const initialKey = keys[randomIndex]
      setCurrentKey(initialKey)
      // 初期表示時はカウントを増やさない
    }
  }, [currentKey, keys])

  // 次のキーを選択する関数
  const selectNextKey = (wasCorrect: boolean) => {
    // 正解の場合のみ現在のキーのカウントを増やす
    if (wasCorrect) {
      setKeyCounts((prev) => ({ ...prev, [currentKey]: prev[currentKey] + 1 }))
    }

    // 現在のキーを除外した選択肢を作成
    const availableKeys = keys.filter((key) => key !== currentKey)

    // 表示回数が最も少ないキーの回数を取得
    const minCount = Math.min(...availableKeys.map((key) => keyCounts[key]))

    // 表示回数が最も少ないキーのリストを作成
    const leastShownKeys = availableKeys.filter((key) => keyCounts[key] === minCount)

    // 表示回数が最も少ないキーからランダムに選択
    const randomIndex = Math.floor(Math.random() * leastShownKeys.length)
    const nextKey = leastShownKeys[randomIndex]

    // 選択したキーを表示
    setCurrentKey(nextKey)

    // ヒントをリセット
    setShowHint(false)
    setSelectedValue("")
    setIsCorrect(null)
  }

  // ヒントを表示する関数
  const toggleHint = () => {
    // 選択された値があるか確認
    if (selectedValue) {
      // 選択された値が正解かどうか判定
      const correctValue = keyHints[currentKey]
      const isAnswerCorrect = Number.parseInt(selectedValue) === correctValue
      setIsCorrect(isAnswerCorrect)
    }

    setShowHint(!showHint)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">ピアノスケール練習アプリ</h1>

      <Card className="w-full max-w-md mb-8 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-center mb-4">
            <Music className="h-8 w-8 text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold">現在のキー</h2>
          </div>
          <div className="flex flex-col items-center justify-center h-40 bg-white rounded-lg border-2 border-gray-200">
            <span className="text-7xl font-bold text-gray-800">{currentKey}</span>
            {showHint && (
              <div
                className={`mt-4 text-xl font-medium px-4 py-2 rounded-md flex items-center ${
                  isCorrect === null
                    ? "text-blue-600 bg-blue-50"
                    : isCorrect
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                }`}
              >
                {isCorrect !== null &&
                  (isCorrect ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />)}
                ヒント: {keyHints[currentKey]}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => selectNextKey(true)}
          size="lg"
          className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 transition-colors"
        >
          正解
        </Button>

        <Button
          onClick={() => selectNextKey(false)}
          size="lg"
          className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 transition-colors"
          variant="destructive"
        >
          不正解
        </Button>

        <Button
          onClick={toggleHint}
          size="lg"
          className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white"
        >
          <HelpCircle className="mr-2 h-5 w-5" />
          ヒント
        </Button>
      </div>

      <Card className="w-full max-w-md mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 text-center">ヒント値を選択</h3>
          <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="grid grid-cols-6 gap-2">
            {hintOptions.map((value) => (
              <div key={value} className="flex items-center space-x-1">
                <RadioGroupItem value={value.toString()} id={`hint-${value}`} />
                <Label htmlFor={`hint-${value}`} className="text-sm">
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="mt-2 text-sm text-gray-500">
        <p>表示回数の統計:</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
          {keys.map((key) => (
            <div key={key} className="flex justify-between px-2 py-1 bg-white rounded border border-gray-200">
              <span>{key}:</span>
              <span>{keyCounts[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
