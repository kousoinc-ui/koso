# エリカ健康道場専用 わん酵素 33枚LP

公開先: https://kouso-inc.com/wanhug/swipe/erika/

**一般向け https://kouso-inc.com/wanhug/swipe/total/ は変更しません。**

## 配置

GitHub リポジトリ `kousoinc-ui/koso` の `wanhug/swipe/erika/` フォルダを新規作成し、ZIPの `erika/` フォルダの中身をそのまま配置します。

```text
wanhug/swipe/
├── total/                 # 既存31枚LP（変更しない）
│   ├── app.js
│   ├── conversion.js
│   ├── style.css
│   └── assets/             # 既存画像31枚
└── erika/                 # 追加する独立URL
    ├── index.html
    ├── letter-pages.js
    ├── erika-attribution.js
    └── assets/
        ├── erika-letter-02.png
        └── erika-letter-03.png
```

## 動作と構成

- 新ページ1：既存 total の1枚目
- 新ページ2・3：エリカ健康道場向けのお手紙画像
- 新ページ4〜33：既存 total の2〜31枚目
- スワイプ、ページ一覧、拡大、固定980円購入CTAを引き継ぐ
- `#page=33` の直リンクに対応
- 新LPの初期UTM: `utm_source=erika_kenkodojo`, `utm_medium=partner`, `utm_campaign=erika_wankoso_trial`。外部から付いたUTMを優先
- 購入リンクの `ref`, `attributes[lp]`, `attributes[lp_version]` を新LP用に変更
- JavaScriptの `dataLayer` イベントにおけるLP IDを新LP用に識別

## ディレクトリ間の依存関係

新LPはコードを複製せず、HTML `<base href="/wanhug/swipe/total/">` で**既存 total のCSS・JS・31枚の画像**を参照します。追加画像2枚のみ `erika/assets/` にあります。このため既存 total の `app.js` の読み込み動作は維持できますが、既存ファイルの変更は新LPにも反映されます。将来完全分離したい場合はCSS・JS・既存31枚も複製し、アセットパスを調整してください。

## テスト手順

1. `https://kouso-inc.com/wanhug/swipe/total/` が引き続き31枚であること
2. `https://kouso-inc.com/wanhug/swipe/erika/` が全33枚で、お手紙画像が2・3枚目に入ること
3. `#page=33` への直接アクセス、ページ一覧・拡大、スワイプ・矢印・戻り操作
4. 画像2枚の表示、スマホ画面の縦横比、980円CTAの正常表示
5. 購入URLの `utm_source=erika_kenkodojo` や `ref=wankoso-erika-swipe`、実際の購入先と価格設定の確認
6. Search Console・GA4等で配信経路と購入の重複計測がないか確認

## 注意

- 商品LPとオンラインストアの **価格や在庫、購入先、初回限定条件** は公開前に再確認してください。
- 既存コードの「31枚」という条件に依存する部分があるため、元 `/total/` の枚数を変更したら `letter-pages.js` 側のチェックも更新が必要です。
- 音声・手紙全文は、この静的画像2枚には含めていません。必要なら別途追加できます。
- 配信先でのブラウザ実機テスト・本番デプロイは未実施です。
