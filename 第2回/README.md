# 第２回　 Vue 勉強会

![Vue アイキャッチ](../vue.png "Vue アイキャッチ")

[▶ Vue Play Ground](https://play.vuejs.org/)

## 今回取り扱う内容
・Vueの状態管理の選択肢について<br>
・v-modelの理解を深める<br>
・Nuxtの概要<br>

<br>

# Vueの状態管理について
#### 【そもそも状態管理って何？】<br>
**「アプリの中で変化するデータの値を、ちゃんと整理して覚えておく仕組み」**のことです。<br>
データを整理しておくことで、「複数コンポーネントで同じデータを共有する」ことが容易に実現できるようになり、コードの見晴らしもよくなります。

#### 【状態管理が必要になる場面の例】<br>

| ユースケース               | 状態の内容                     | 詳細                              |
|----------------------------|-------------------------------|-----------------------------------------------|
| **ショッピングカート**        | カートに入っている商品情報             | 複数のページ（商品一覧、詳細、カート確認）でカートの中身を共有したい    |
| **別タブ間の認証状態同期**       | 複数タブでログイン状態が共有されている     | ログアウトしたら他のタブでもログアウトさせたい               |
| **フォーム入力内容の一時保存**        | 入力途中のフォームデータ              | ページ遷移後も入力内容を記憶し残しておきたい場合など                  |

<br>

### 【Vueにおけるコンポーネント間の状態管理手法】<br>
1. Ref(Reactive) × Props / Emit
2. Provide / Inject
3. Pinia


### 1. Ref(Reactive) × Props / Emit
[▶ sample code](https://github.com/a-nakashima-seta/VueWork/tree/main/%E7%AC%AC2%E5%9B%9E/codes/src/components/PropsEmit)

Vueアプリケーションにおける最も基本的な状態管理の方法が、「**Props イベントアップ**」という考え方です。<br>
親コンポーネントから子コンポーネントへは **`props`** を使ってデータを渡し、子から親へは **`emit` を使ってイベントを発火し、データの変更を通知**します。

#### ⚠️ 注意点

* `props` は読み取り専用のため、子コンポーネントから直接変更することはできません。
* コンポーネント階層が深くなると、`props` を何層にも渡していく「バケツリレー」状態になりやすく、データの流れが複雑になる点に注意が必要です。


<br>

### 2. Provide / Inject
[▶ sample code](https://github.com/a-nakashima-seta/VueWork/tree/main/%E7%AC%AC2%E5%9B%9E/codes/src/components/ProvideInject)

`provide` と `inject` は、**親コンポーネントから離れた子孫コンポーネントへ状態を共有する**ための仕組みです。<br>
深い階層のコンポーネントに直接データを渡すことができるため、「propsのバケツリレー問題」を解消する手段として有効です。

親コンポーネント側で `provide` によってデータを提供し、子孫コンポーネント側で `inject` を使ってそのデータを受け取ります。

#### ⚠️ 注意点

* `inject` で受け取ったデータは基本的にリアクティブではないため、**状態の変化に応じて再レンダリングさせたい場合は、`ref` や `reactive` を使って渡す必要があります**。
* 双方向バインディングには対応していないため、**子孫コンポーネントから状態を直接変更することは推奨されません**（技術的には可能）。
* 親と子孫の**依存関係が不透明になりやすく、可読性が低下する**可能性があるため、設計には注意が必要です。


<br>

### 3. Pinia
[▶ pinia公式🍍](https://pinia.vuejs.org/)

[▶ sample code](https://github.com/a-nakashima-seta/VueWork/tree/main/%E7%AC%AC2%E5%9B%9E/codes/src/components/ProvideInject)


`Pinia` は、Vueアプリケーションのための **公式の状態管理ライブラリ** です。

#### Pinia のユースケース

* グローバルで共有する状態（ユーザー情報、認証状態、テーマ設定など）
* 複数コンポーネント間でのリアクティブなデータのやりとりが必要な場合
* ローカルステートだけでは管理が煩雑になる中〜大規模なアプリケーション

#### Pinia の導入方法

1. **インストール**

```bash
npm install pinia
```

2. **メインエントリで Pinia を登録**

```ts
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

3. **ストアの定義**

```ts
// stores/counter.ts
// stores/counter.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count,
    increment
  }
})

```

4. **ストアの利用**

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <button @click="counter.increment">
    カウント: {{ counter.count }}
  </button>
</template>
```

---

#### 💡 Tips: Piniaで分割代入を使う方法

piniaでは分割代入が使えないとされていましたが、`storeToRefs()`という機能を使用することによって呼び出し元で分割代入を使用するk所とができるようになります。

```ts
// ストアの記述
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";

const useCounterStore = defineStore('counter', () => {
    const count = ref<number>(0)
    const increment = () => {
        count.value++
    }
    const decrement = () => {
        count.value++
    }
    return { count, increment, decrement }
})

// 下記でexportすることで呼び出し元で分割代入が使用可能になる
export default () => {
    const $store = useCounterStore()
    return { ...$store, ...storeToRefs($store) }
}
```

```ts
// 呼び出し元のコンポーネント内の記述
const store = useUserDataStore()
const { count, increment, decrement } = store
```

---

### ⚠️Provide/injectという機能がありながら、なぜPiniaが必要なのか？
#### 1. 拡張性
`provide/inject`は親から子へデータや関数を渡すのに便利ですが、あくまで依存注入の仕組みであり、**グローバルな**状態管理ツールではありません。Piniaはアプリ全体で状態を共有管理するための スケーラブルな仕組みが整備されています。
#### 2. リアクティビティ
`provide/inject`ではリアクティブなデータの更新が手動でやや面倒です。更新検知もVueのリアクティビティシステムに直接乗らないケースもあります。<br>
PiniaはVueのリアクティブシステムに完全に統合されており、再レンダリングや監視が自然に行えるようになっています。



### 状態管理のまとめ
アプリケーション内のデータ管理は決まった正解はないため、状況に応じて土の手法を選択すべきかを判断するコヨが重要である。下記は状態管理手法の判断基準の一例である。

| 状況                         | 推奨手法                 |
| -------------------------- | -------------------- |
| 単純な親子間のデータ受け渡しをしたい         | `Ref / Props / Emit` |
| 何層にもわたってデータを渡したいがバケツリレーは避けたい    | `Provide / Inject`   |
| ・グローバルに共通する状態（認証情報など）を管理したい<br>・グローバルかつリアクティブなデータを扱う | `Pinia`              |

<br>



# v-model の理解を深める

### 「Vueらしさ」を支える根幹の仕組み

`v-model` は、Vue の特徴である**双方向データバインディング**を実現するための中核的な構文です。<br>
フォームと状態の同期を簡潔に記述できるため、Vueのリアクティブかつ宣言的な開発スタイルを象徴しています。

---

### 1. ひとつのコンポーネントに対して **複数の v-model** を指定可能

Vue 3 からは、**名前付きの v-model** に対応しています。これにより、1つのコンポーネントに複数のバインディングを行うことができます。

#### 呼び出し側

```vue
<MyForm v-model:title="postTitle" v-model:content="postContent" />
```

#### コンポーネント側（従来の書き方）

```ts
// MyForm.vue
<script setup>
defineProps(['title', 'content'])
defineEmits(['update:title', 'update:content'])
</script>

<template>
  <input v-model="title" />
  <textarea v-model="content" />
</template>
```

---

### 2. 推奨マクロ：`defineModel()`について

Vue 3.3 以降では、`v-model` をより簡潔・型安全に使える**新しい構文 `defineModel()`** が導入されました。

#### 使用方法

```ts
<script setup>
const title = defineModel('title')
const content = defineModel('content')
</script>

<template>
  <input v-model="title" />
  <textarea v-model="content" />
</template>
```

`defineProps()` や `defineEmits()` を自分で書く必要がなく、よりシンプルになります。

---

### `defineModel()` のメリット

| メリット                  | 内容                                       |
| --------------------- | ---------------------------------------- |
| 記述の簡略化              | `props`・`emits` の定義が不要。`ref` として直感的に扱える  |
| 複数モデルの自然な管理         | 名前付きモデルにも対応し、複数の状態をすっきり記述可能              |
| 型推論の恩恵              | `defineModel<Type>()` によって型安全に扱え、補完も効く   |
| Composition APIと統一感 | `ref` のように扱えるため、Composition API に完全に溶け込む |

---

#### ✏️ 従来の書き方（複数モデル）

```ts
// MyInput.vue
<script setup>
const props = defineProps(['title', 'content'])
const emit = defineEmits(['update:title', 'update:content'])

const updateTitle = (value) => emit('update:title', value)
const updateContent = (value) => emit('update:content', value)
</script>

<template>
  <input :value="props.title" @input="updateTitle($event.target.value)" />
  <textarea :value="props.content" @input="updateContent($event.target.value)" />
</template>
```

#### `defineModel()` を使った書き方

```ts
<script setup>
const title = defineModel('title')
const content = defineModel('content')
</script>

<template>
  <input v-model="title" />
  <textarea v-model="content" />
</template>
```

➡ **記述量が約1/2になり、読みやすく、型推論の恩恵も得られる。**

---

### まとめ：どう活用するべきか？

| 状況                         | 推奨手段                  |
| -------------------------- | --------------------- |
| 1つの状態を簡単に双方向バインドしたい        | デフォルトの `v-model`      |
| 複数の状態をバインドしたい              | 名前付き `v-model`        |
| Composition API でスマートに扱いたい | `defineModel()` を積極活用 |

---

### こんなときに使おう！

* 複数のフォームフィールドを双方向バインドしたい
* 型安全な状態管理をしたい
* Props / Emits の定義を省略したい
* Composition API に慣れている開発者とチームを組んでいる