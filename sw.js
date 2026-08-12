// C108 巡回リスト オフライン用 Service Worker
// 方針：通信があれば新しい版を取りに行き、取れなければキャッシュを使う。
// お品書き画像も初回にまとめてキャッシュし、会場で通信なしでも表示できるようにする。
const CACHE = 'c108-v4';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-512.png'
];
const IMGS = [
  './img/GyTvGeRa4AQNa8l.jpg',
  './img/HKR7-AYakAACbiv.jpg',
  './img/HM8FkqRbsAEYsIP.jpg',
  './img/HN-6mJ3aAAAEght 1.jpg',
  './img/HN-6mJ3aAAAEght.jpg',
  './img/HNvnFNwbsAAa8oI.jpg',
  './img/HO29e4UaIAA_lUp.jpg',
  './img/HO38fl-acAEfSNu.jpg',
  './img/HO3lGTTbMAAkjzq.jpg',
  './img/HO483MYa0AAQxq1.jpg',
  './img/HO8t2X5aUAAemnL.jpg',
  './img/HO9J4IibYAAyjcn.jpg',
  './img/HO9km-jbgAAzQIM.jpg',
  './img/HOZJip2bAAAA9xW.jpg',
  './img/HOjJVEqbcAAyUHr.jpg',
  './img/HOnKAxBa0AAF5wD.jpg',
  './img/HOoE9c9akAAbjty.jpg',
  './img/HOojIjGbIAAoVez.jpg',
  './img/HOrqLW4a0AAVcJm.jpg',
  './img/HOsC-t7aQAEX5M8.jpg',
  './img/HOtx9pEaYAAiO5N.jpg',
  './img/HOyhscwakAAvSmQ.jpg',
  './img/HOzMuxbaQAAGjr6.jpg',
  './img/HPA1ajyakAIABKS.jpg',
  './img/HPA1ajza0AAe8mz.jpg',
  './img/HPB2HOab0AAPdeA.jpg',
  './img/HPBa3v0bIAAbAz8.jpg',
  './img/HPBa5ltbkAA9jTL.jpg',
  './img/HPBrOwFaAAApcGU.jpg',
  './img/HPBrOxkbUAAltAm.jpg',
  './img/HPC3ml-bQAA0NvO.jpg',
  './img/HPFLxeubgAAe8Qw.jpg',
  './img/HPGviL0a8AA-vI7.jpg',
  './img/HPGx2lIbQAAoS-I.jpg',
  './img/HPGy1vOaEAASRwq.jpg',
  './img/HPHDQoQbcAEwKw2.jpg',
  './img/HPHHJoOaMAA_4cV.jpg',
  './img/HPHHJtjbUAASDsu.jpg',
  './img/HPHHispaYAA3dUo.jpg',
  './img/HPHNHXVaMAAigmR.jpg',
  './img/HPHPeoDa4AEdkn4.jpg',
  './img/HPHWpbNb0AEuT0u.jpg',
  './img/HPHdk7NbQAAPyEy.jpg',
  './img/HPHgLRaaIAA2VDj.jpg',
  './img/HPHySrgaAAIzZYG.jpg',
  './img/HPIdFTAbQAA4lb7.jpg',
  './img/HPIdHdmaEAAoIeW.jpg',
  './img/HPKrPifbgAASUx7.jpg',
  './img/HPL5SVXa4AAcN8A.jpg',
  './img/HPL8Soha4AAZpJ_.jpg',
  './img/HPLaAqCbsAAZrST.jpg',
  './img/HPMF-YwbYAAvRNV.jpg',
  './img/HPMIkcIbcAEap-y.jpg',
  './img/HPMIkcKbAAEt8JN.jpg',
  './img/HPMJJQ5awAAZOgL.jpg',
  './img/HPMK5mjawAA2A5a.jpg',
  './img/HPMLdEyaEAAaPYu.jpg',
  './img/HPMNk6qboAAKIpe.jpg',
  './img/HPMQ898WEAAGu21.jpg',
  './img/HPMQ9avWMAAAFeg.jpg',
  './img/HPMZSWaaUAAuR1d.jpg',
  './img/HPPxYdfa0AAEbXY.jpg',
  './img/HPQ6wdKa4AAgHVv.jpg',
  './img/HPQQsIZagAAeWnl.jpg',
  './img/HPQ_reFbwAAj2MG.jpg',
  './img/HPR1cAdbAAASsxH.jpg',
  './img/HPRB4RdaQAAJn_c.jpg',
  './img/HPRB4ReaYAAI-tv.jpg',
  './img/HPRLSbLbEAAyrLT.jpg',
  './img/HPRLSbSa0AAJabM.jpg',
  './img/HPRMBdNbwAA1kut.jpg',
  './img/HPRTKZFbIAAOuFe.jpg',
  './img/HPR_OmkacAAMOY8.jpg',
  './img/HPRoPmfbUAAx6v6.jpg',
  './img/HPRoUQ6aEAA8TOh.jpg',
  './img/HPRpwMdaoAAJu0t.jpg',
  './img/HPU28nlaIAAkDf-.jpg',
  './img/HPV2lp-boAADSk4.jpg',
  './img/HPV2mkuboAAXh1G.jpg',
  './img/HPVFlPIaUAAJdm3.jpg',
  './img/HPVFmUUbMAAKzk1.jpg',
  './img/HPVFn5ZaQAERxu3.jpg',
  './img/HPVFnJ6awAALwzt.jpg',
  './img/HPWKMO-b0AAuSlW.jpg',
  './img/HPWKMO8bEAATlBL.jpg',
  './img/HPWTJkxbIAAEqJW.jpg',
  './img/HPWcze3aIAAF4f6.jpg',
  './img/HPWf4i7aoAAD1UV.jpg',
  './img/HPWnROGbUAA4g4H 1.jpg',
  './img/HPWnROGbUAA4g4H.jpg',
  './img/HPWsjKabYAAxLxz.jpg',
  './img/HPWt8xKbwAAuNtS.jpg',
  './img/HPWvWCKbkAEPcag.jpg',
  './img/HPXHwM-bcAAVE6G.jpg',
  './img/HPXKXuta4AE2HlB.jpg',
  './img/HPXVWZxboAE-QhR.jpg',
  './img/HPYdmICa8AAMUUy.jpg',
  './img/HPa_nWFawAAFXKf.jpg',
  './img/HPb4Jc0aYAABRX1.jpg',
  './img/HPbeTtna0AAMW5H.jpg',
  './img/HPbg568awAAx816.jpg',
  './img/HPblJXBbEAAxZGa.jpg',
  './img/HPbuOopaQAAyoFW.jpg',
  './img/HPbzyWkbcAAeJuo.jpg',
  './img/HPcE0uVbgAA9lUl.jpg',
  './img/HPcE1MvbYAAax0k.jpg',
  './img/HPcEKW3bsAAkmpL.jpg',
  './img/HPcEKW4bkAAAcsX.jpg',
  './img/HPcEKXAaUAMX_Fy.jpg',
  './img/HPcJyEya0AATrwF.jpg',
  './img/HPdc-vOa8AAvYs4.jpg',
  './img/HPdc9qCaUAAE7Ke.jpg',
  './img/HPfY_ltaUAANEmb.jpg',
  './img/HPfclMvaoAAey1H.jpg',
  './img/HPg8sziakAA02UP.jpg',
  './img/HPgFIjAaIAAbv77.jpg',
  './img/HPgsXsDaoAAOBwM.jpg',
  './img/HPhBuWpbMAAJy3r.jpg',
  './img/HPhFgZHbUAABisB.jpg',
  './img/HPhS0fsbgAA3NNI.jpg',
  './img/HPhZzrpakAA8Z3s.jpg',
  './img/HPhhVN6bgAIEdFc.jpg',
  './img/HPhi2jzacAEYyeL.jpg',
  './img/HPhlht6bwAA-Xr2.jpg',
  './img/HPhpKabbYAAUfZa.jpg',
  './img/HPhr6AoawAAj8Jo.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    // 画像は1枚失敗しても全体を止めない
    await Promise.all(IMGS.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isImg = e.request.url.indexOf('/img/') !== -1;
  if (isImg) {
    // 画像は中身が変わらないのでキャッシュ優先（表示が速い）
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); }
        return res;
      }))
    );
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request, { ignoreSearch: true })
          .then(hit => hit || caches.match('./index.html'))
      )
  );
});
