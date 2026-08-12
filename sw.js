// C108 巡回リスト オフライン用 Service Worker
// 画像はリポジトリ直下に配置されている前提
const CACHE = 'c108-v6';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-512.png'
];
const IMGS = [
  './GyTvGeRa4AQNa8l.jpg',
  './HKR7-AYakAACbiv.jpg',
  './HM8FkqRbsAEYsIP.jpg',
  './HN-6mJ3aAAAEght 1.jpg',
  './HN-6mJ3aAAAEght.jpg',
  './HNvnFNwbsAAa8oI.jpg',
  './HO29e4UaIAA_lUp.jpg',
  './HO38fl-acAEfSNu.jpg',
  './HO3lGTTbMAAkjzq.jpg',
  './HO483MYa0AAQxq1.jpg',
  './HO8t2X5aUAAemnL.jpg',
  './HO9J4IibYAAyjcn.jpg',
  './HO9km-jbgAAzQIM.jpg',
  './HOZJip2bAAAA9xW.jpg',
  './HOjJVEqbcAAyUHr.jpg',
  './HOnKAxBa0AAF5wD.jpg',
  './HOoE9c9akAAbjty.jpg',
  './HOojIjGbIAAoVez.jpg',
  './HOrqLW4a0AAVcJm.jpg',
  './HOsC-t7aQAEX5M8.jpg',
  './HOtx9pEaYAAiO5N.jpg',
  './HOyhscwakAAvSmQ.jpg',
  './HOzMuxbaQAAGjr6.jpg',
  './HPA1ajyakAIABKS.jpg',
  './HPA1ajza0AAe8mz.jpg',
  './HPB2HOab0AAPdeA.jpg',
  './HPBa3v0bIAAbAz8.jpg',
  './HPBa5ltbkAA9jTL.jpg',
  './HPBrOwFaAAApcGU.jpg',
  './HPBrOxkbUAAltAm.jpg',
  './HPC3ml-bQAA0NvO.jpg',
  './HPFLxeubgAAe8Qw.jpg',
  './HPGviL0a8AA-vI7.jpg',
  './HPGx2lIbQAAoS-I.jpg',
  './HPGy1vOaEAASRwq.jpg',
  './HPHDQoQbcAEwKw2.jpg',
  './HPHHJoOaMAA_4cV.jpg',
  './HPHHJtjbUAASDsu.jpg',
  './HPHHispaYAA3dUo.jpg',
  './HPHNHXVaMAAigmR.jpg',
  './HPHPeoDa4AEdkn4.jpg',
  './HPHWpbNb0AEuT0u.jpg',
  './HPHdk7NbQAAPyEy.jpg',
  './HPHgLRaaIAA2VDj.jpg',
  './HPHySrgaAAIzZYG.jpg',
  './HPIdFTAbQAA4lb7.jpg',
  './HPIdHdmaEAAoIeW.jpg',
  './HPKrPifbgAASUx7.jpg',
  './HPL5SVXa4AAcN8A.jpg',
  './HPL8Soha4AAZpJ_.jpg',
  './HPLaAqCbsAAZrST.jpg',
  './HPMF-YwbYAAvRNV.jpg',
  './HPMIkcIbcAEap-y.jpg',
  './HPMIkcKbAAEt8JN.jpg',
  './HPMJJQ5awAAZOgL.jpg',
  './HPMK5mjawAA2A5a.jpg',
  './HPMLdEyaEAAaPYu.jpg',
  './HPMNk6qboAAKIpe.jpg',
  './HPMQ898WEAAGu21.jpg',
  './HPMQ9avWMAAAFeg.jpg',
  './HPMZSWaaUAAuR1d.jpg',
  './HPPxYdfa0AAEbXY.jpg',
  './HPQ6wdKa4AAgHVv.jpg',
  './HPQQsIZagAAeWnl.jpg',
  './HPQ_reFbwAAj2MG.jpg',
  './HPR1cAdbAAASsxH.jpg',
  './HPRB4RdaQAAJn_c.jpg',
  './HPRB4ReaYAAI-tv.jpg',
  './HPRLSbLbEAAyrLT.jpg',
  './HPRLSbSa0AAJabM.jpg',
  './HPRMBdNbwAA1kut.jpg',
  './HPRTKZFbIAAOuFe.jpg',
  './HPR_OmkacAAMOY8.jpg',
  './HPRoPmfbUAAx6v6.jpg',
  './HPRoUQ6aEAA8TOh.jpg',
  './HPRpwMdaoAAJu0t.jpg',
  './HPU28nlaIAAkDf-.jpg',
  './HPV2lp-boAADSk4.jpg',
  './HPV2mkuboAAXh1G.jpg',
  './HPVFlPIaUAAJdm3.jpg',
  './HPVFmUUbMAAKzk1.jpg',
  './HPVFn5ZaQAERxu3.jpg',
  './HPVFnJ6awAALwzt.jpg',
  './HPWKMO-b0AAuSlW.jpg',
  './HPWKMO8bEAATlBL.jpg',
  './HPWTJkxbIAAEqJW.jpg',
  './HPWcze3aIAAF4f6.jpg',
  './HPWf4i7aoAAD1UV.jpg',
  './HPWnROGbUAA4g4H 1.jpg',
  './HPWnROGbUAA4g4H.jpg',
  './HPWsjKabYAAxLxz.jpg',
  './HPWt8xKbwAAuNtS.jpg',
  './HPWvWCKbkAEPcag.jpg',
  './HPXHwM-bcAAVE6G.jpg',
  './HPXKXuta4AE2HlB.jpg',
  './HPXVWZxboAE-QhR.jpg',
  './HPYdmICa8AAMUUy.jpg',
  './HPa_nWFawAAFXKf.jpg',
  './HPb4Jc0aYAABRX1.jpg',
  './HPbeTtna0AAMW5H.jpg',
  './HPbg568awAAx816.jpg',
  './HPblJXBbEAAxZGa.jpg',
  './HPbuOopaQAAyoFW.jpg',
  './HPbzyWkbcAAeJuo.jpg',
  './HPcE0uVbgAA9lUl.jpg',
  './HPcE1MvbYAAax0k.jpg',
  './HPcEKW3bsAAkmpL.jpg',
  './HPcEKW4bkAAAcsX.jpg',
  './HPcEKXAaUAMX_Fy.jpg',
  './HPcJyEya0AATrwF.jpg',
  './HPdc-vOa8AAvYs4.jpg',
  './HPdc9qCaUAAE7Ke.jpg',
  './HPfY_ltaUAANEmb.jpg',
  './HPfclMvaoAAey1H.jpg',
  './HPg8sziakAA02UP.jpg',
  './HPgFIjAaIAAbv77.jpg',
  './HPgsXsDaoAAOBwM.jpg',
  './HPhBuWpbMAAJy3r.jpg',
  './HPhFgZHbUAABisB.jpg',
  './HPhS0fsbgAA3NNI.jpg',
  './HPhZzrpakAA8Z3s.jpg',
  './HPhhVN6bgAIEdFc.jpg',
  './HPhi2jzacAEYyeL.jpg',
  './HPhlht6bwAA-Xr2.jpg',
  './HPhpKabbYAAUfZa.jpg',
  './HPhr6AoawAAj8Jo.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
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
  const isImg = /\.jpg$/i.test(e.request.url);
  if (isImg) {
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
