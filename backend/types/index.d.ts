export interface ICaseFromSteamApi {
  id: string;
  markethashname: string;
  marketname: string;
  slug: string;
  count: number;
  classid: string;
  instanceid: string;
  groupid: string;
  infoprice: string;
  pricelatest: number;
  pricelatestsell: number;
  pricelatestsell24h: number;
  pricelatestsell7d: number;
  pricelatestsell30d: number;
  pricelatestsell90d: number;
  pricemedian: number;
  pricemedian24h: number;
  pricemedian7d: number;
  pricemedian30d: number;
  pricemedian90d: number;
  priceavg: number;
  priceavg24h: number;
  priceavg7d: number;
  priceavg30d: number;
  priceavg90d: number;
  pricesafe: number;
  pricemin: number;
  pricemax: number;
  pricemix: number;
  buyorderprice: number;
  buyordermedian: number;
  buyorderavg: number;
  buyordervolume: number;
  offervolume: number;
  soldtoday: number;
  sold24h: number;
  sold7d: number;
  sold30d: number;
  sold90d: number;
  soldtotal: number;
  hourstosold: number;
  points: number;
  priceupdatedat: Priceupdatedat;
  nametag: any;
  bordercolor: string;
  color: string;
  quality: string;
  rarity: string;
  itemimage: string;
  marketable: boolean;
  tradable: boolean;
  unstable: boolean;
  unstablereason: any;
  createdat: Createdat;
  firstseentime: number;
  firstSeenAt: FirstSeenAt;
  steamurl: string;
  markettradablerestriction: number;
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: any;
  tag6: string;
  tag7: string;
  infotypehintihldfhcjbaeg: string;
  infopricereal: string;
  pricereal: number;
  pricereal24h: number;
  pricereal7d: number;
  pricereal30d: number;
  pricereal90d: number;
  pricerealmedian: any;
  winloss: number;
  wear: any;
  isstar: boolean;
  isstattrak: boolean;
  itemgroup: string;
  itemname: string;
  itemtype: string;
}

export interface Priceupdatedat {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface Createdat {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface FirstSeenAt {
  date: string;
  timezone_type: number;
  timezone: string;
}
