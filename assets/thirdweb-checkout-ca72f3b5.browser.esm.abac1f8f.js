import{q as r,_ as h,r as n}from"./index.a3e4bd05.js";const d="https://paper.xyz/api",u="2022-08-12",o=`${d}/${u}/platform/thirdweb`,s={[r.Mainnet]:"Ethereum",[r.Goerli]:"Goerli",[r.Polygon]:"Polygon",[r.Mumbai]:"Mumbai",[r.Avalanche]:"Avalanche"};function p(e){return n(e in s,`chainId not supported by paper: ${e}`),s[e]}async function l(e,t){const i=p(t),c=await(await fetch(`${o}/register-contract?contractAddress=${e}&chain=${i}`)).json();return n(c.result.id,"Contract is not registered with paper"),c.result.id}const P={expiresInMinutes:15,feeBearer:"BUYER",sendEmailOnSuccess:!0,redirectAfterPayment:!1};async function y(e,t){const a=await(await fetch(`${o}/checkout-link-intent`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contractId:e,...P,...t,metadata:{...t.metadata,via_platform:"thirdweb"},hideNativeMint:!0,hidePaperWallet:!!t.walletAddress,hideExternalWallet:!0,hidePayWithCrypto:!0,usePaperKey:!1})})).json();return n(a.checkoutLinkIntentUrl,"Failed to create checkout link intent"),a.checkoutLinkIntentUrl}class I{constructor(t){h(this,"contractWrapper",void 0),this.contractWrapper=t}async getCheckoutId(){return l(this.contractWrapper.readContract.address,await this.contractWrapper.getChainID())}async isEnabled(){try{return!!await this.getCheckoutId()}catch{return!1}}async createLinkIntent(t){return await y(await this.getCheckoutId(),t)}}export{I as P};
