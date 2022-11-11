import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCointTickers } from "../api";
import styled from "styled-components";

const CurrentPrice = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  span {
    margin: 5px 0;
    &:last-child {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Boxs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 15px 25px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  font-size: 13px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  span {
    margin: 5px 0;
  }
`;

interface PriceProps {
  coinId: string;
}

interface PriceInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<PriceInfoData>(["tickers", coinId], () =>
    fetchCointTickers(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Price Info..."
      ) : (
        <>
          <CurrentPrice>
            <span>Current Price :</span>
            <span>${data?.quotes.USD.price.toFixed(2)}</span>
          </CurrentPrice>
          <Boxs>
            <Box>
              <span>Change percent in last 1h :</span>
              <span>{data?.quotes.USD.percent_change_1h}%</span>
            </Box>
            <Box>
              <span>Change percent in last 6h :</span>
              <span>{data?.quotes.USD.percent_change_6h}%</span>
            </Box>
            <Box>
              <span>Change percent in last 12h :</span>
              <span>{data?.quotes.USD.percent_change_12h}%</span>
            </Box>
            <Box>
              <span>Change percent in last 24h :</span>
              <span>{data?.quotes.USD.percent_change_24h}%</span>
            </Box>
            <Box>
              <span>Change percent in last 7d :</span>
              <span>{data?.quotes.USD.percent_change_7d}%</span>
            </Box>
            <Box>
              <span>Change percent in last 30d :</span>
              <span>{data?.quotes.USD.percent_change_30d}%</span>
            </Box>
          </Boxs>
        </>
      )}
    </div>
  );
}

export default Price;
