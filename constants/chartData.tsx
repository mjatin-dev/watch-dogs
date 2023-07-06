import moment from "moment";

export function createScatterChartData(array: any[], key: string) {
  const groupedData = groupObjectsByKey(array, key);
  const scatterChartData = groupedData.map((group) => ({
    name: group.name,
    data: group.data.map((dataItem) => ({
      x: dataItem.x,
      y: dataItem.y,
      buyer_address: dataItem.buyer_address,
      tx_hash: dataItem.tx_hash,
      seller_fee_amt: dataItem.seller_fee_amt,
      marketplace: dataItem.marketplace,
      tokenid: dataItem.tokenid,
      contract_addr: dataItem.contract_addr,
    })),
  }));

  return scatterChartData;
}

export function groupObjectsByKey(
  array: any[],
  key: string
): { name: string; data: any[] }[] {
  const result: { name: string; data: any[] }[] = [];

  array?.map((obj) => {
    const tempKey = obj[key];
    const group = result.find((item) => item.name === tempKey);
    if (group) {
      group.data.push({
        x: moment(obj.t_date).format("MMM DD, YYYY"),
        y: obj.profit ? obj.profit : 0,
        buyer_address: obj?.buyer_address,
        tx_hash: obj?.tx_hash,
        seller_fee_amt: obj?.seller_fee_amt,
        marketplace: obj?.marketplace,
        tokenid: obj?.tokenid,
        contract_addr: obj?.contract_addr,
      });
    } else {
      result.push({
        name: tempKey,
        data: [
          {
            x: new Date(obj.t_date),
            y: obj.profit ? obj.profit : 0,
            buyer_address: obj?.buyer_address,
            tx_hash: obj?.tx_hash,
            seller_fee_amt: obj?.seller_fee_amt,
            marketplace: obj?.marketplace,
            tokenid: obj?.tokenid,
            contract_addr: obj?.contract_addr,
          },
        ],
      });
    }
  });
  return result;
}
