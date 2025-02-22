import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import {
  ChevronRight,
  ChevronDown,
  Sun,
  Moon,
  Grid,
  LineChart,
  Briefcase,
  Users,
  FileText,
  Settings,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import logo from "../assets/images/logo.svg";

// Types
interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface BalanceItemProps {
  label: string;
  amount: string;
}

interface TradeData {
  products: string;
  quantity: number;
  bidPrice?: number;
  offerPrice?: number;
  buy?: boolean;
  sell?: boolean;
}

interface TradeLogData {
  security: string;
  board: string;
  orderType: string;
  matchedPrice: number;
  quantity: number;
  date: string;
  time: string;
}

// Styled Components
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.div`
  margin-left: calc(83px + 207px + 24px);
  margin-top: 68px;
  width: calc(100% - 83px - 207px - 48px);
  padding: 0 24px;
`;

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 100;
  border-bottom: 1px solid #e5e7eb;
`;

const Logo = styled.img`
  width: 120px;
  margin-right: auto;
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: #f3f4f6;
  border-radius: 24px;
  cursor: pointer;
`;

const ThemeLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  text-transform: uppercase;
`;

const ToggleSwitch = styled.div<{ isLight: boolean }>`
  width: 48px;
  height: 24px;
  background: ${({ isLight }) => (isLight ? "#4ADE80" : "#6B7280")};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${({ isLight }) => (isLight ? "26px" : "2px")};
    transition: all 0.3s ease;
  }
`;

const VerticalDivider = styled.div`
  height: 24px;
  width: 1px;
  background: #e5e7eb;
  margin: 0 16px;
`;

const BalanceSection = styled.div`
  display: flex;
  gap: 24px;
`;

const BalanceItem = styled.div`
  text-align: center;
`;

const BalanceLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const BalanceAmount = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const DemoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DemoButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #1f2937;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
`;

const ChevronButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 64px;
  width: 83px;
  height: calc(100vh - 64px);
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  gap: 25px;
  margin-right: 16px;
`;

const SidebarItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 12px 0;
  cursor: pointer;
  color: ${({ active }) => (active ? "#D71E0E" : "#6B7280")};

  &:hover {
    background: #f3f4f6;
  }
`;

const SidebarLabel = styled.span`
  font-size: 12px;
  text-align: center;
`;

const SidePanel = styled.div`
  position: fixed;
  left: 90px;
  top: 68px;
  width: 207px;
  height: 352px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 4px;
`;

const SearchBar = styled.input`
  width: 90%;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const SidePanelItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  color: ${({ active }) => (active ? "#D71E0E" : "#111827")};

  &:hover {
    background: #f3f4f6;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 8px;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const FilterTab = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background: ${({ active }) => (active ? "#D71E0E" : "#F3F4F6")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#111827")};
  cursor: pointer;

  &:hover {
    background: ${({ active }) => (active ? "#B91C1C" : "#E5E7EB")};
  }
`;

const TableContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const TableCard = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 4px;
  padding: 16px;
  height: 352px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #6b7280;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 12px;
  height: 29px;

  border-bottom: 1px solid #e5e7eb;
`;

const ActionButton = styled.button<{ variant: "buy" | "sell" }>`
  padding: 4px 12px;
  border-radius: 2px;
  cursor: pointer;
  ${({ variant }) =>
    variant === "buy"
      ? `
    background: transparent;
    border: 1px solid #52965E;
    color: #52965E;
    `
      : `
    background: transparent;
    border: 1px solid #E55541;
    color: #E55541;
    `}
`;

const PriceCell = styled.td<{ type: "bid" | "offer" }>`
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: ${({ type }) => (type === "bid" ? "#52965E" : "#E55541")};
`;

const TradeLogCard = styled.div`
  background: #ffffff;
  border-radius: 4px;
  padding: 16px;
  height: 365px;
  overflow-y: auto;
`;

const TradeLogTable = styled(Table)`
  tr {
    height: 49px;
  }

  td,
  th {
    height: 55px;
    box-sizing: border-box;
  }
`;

const LiveMarketTicker = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0;
  overflow: hidden;
  border-top: 1px solid #e5e7eb;
`;

const TickerHeader = styled.div`
  background: black;
  color: white;
  height: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const TickerContent = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  flex: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TickerItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 44px;
  white-space: nowrap;
  /* border-right: 1px solid #e5e7eb; */
  height: 100%;
`;

const TickerLabel = styled.span`
  color: #111827;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 2px;
`;

const TickerValue = styled.span`
  color: #111827;
  font-weight: 400;
  font-size: 14px;
`;

// Components
const BalanceItemComponent: React.FC<BalanceItemProps> = ({
  label,
  amount,
}) => (
  <BalanceItem>
    <BalanceLabel>{label}</BalanceLabel>
    <BalanceAmount>{amount}</BalanceAmount>
  </BalanceItem>
);

const SidebarItemComponent: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  onClick,
}) => (
  <SidebarItem active={active} onClick={onClick}>
    {icon}
    <SidebarLabel>{label}</SidebarLabel>
  </SidebarItem>
);

export const TradingInterface: React.FC = () => {
  const [isLight, setIsLight] = useState(true);
  const [activeSection, setActiveSection] = useState("market");

  const buyData: TradeData[] = [
    { products: "Soybeans (SSBS)", quantity: 2003, bidPrice: 1736.92 },
    { products: "Paddy Rice (SPRL)", quantity: 11293, bidPrice: 3627 },
    { products: "Maize (SMAZ)", quantity: 1832, bidPrice: 8294.01 },
    { products: "Sorghum (SSGM)", quantity: 29102, bidPrice: 8192 },
    { products: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
    { products: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
  ];

  const sellData: TradeData[] = [
    { products: "Soybeans (SSBS)", quantity: 2003, offerPrice: 1736.92 },
    { products: "Paddy Rice (SPRL)", quantity: 11293, offerPrice: 3627 },
    { products: "Maize (SMAZ)", quantity: 1832, offerPrice: 8294.01 },
    { products: "Sorghum (SSGM)", quantity: 29102, offerPrice: 8192 },
    { products: "Fair Trade ETC (FETC)", quantity: 3212, offerPrice: 1736.92 },
    { products: "Fair Trade ETC (FETC)", quantity: 3212, offerPrice: 1736.92 },
  ];

  const tradeLogData: TradeLogData[] = [
    {
      security: "Soybeans (SSBS)",
      board: "X-Traded",
      orderType: "Buy",
      matchedPrice: 1792.65,
      quantity: 9265,
      date: "17 Oct, 2020",
      time: "07:38",
    },
    {
      security: "Paddy Rice (SPRL)",
      board: "X-Traded",
      orderType: "Buy",
      matchedPrice: 1792.65,
      quantity: 9265,
      date: "8 Sep, 2020",
      time: "02:02",
    },
    {
      security: "Maize (SMAZ)",
      board: "OTC",
      orderType: "Sell",
      matchedPrice: 1792.65,
      quantity: 9265,
      date: "24 May, 2020",
      time: "06:42",
    },
    {
      security: "Sorghum (SSGM)",
      board: "FI",
      orderType: "Sell",
      matchedPrice: 1792.65,
      quantity: 9265,
      date: "1 Feb, 2020",
      time: "01:09",
    },
  ];

  return (
    <>
      <Layout>
        <TopBar>
          <Logo src={logo} alt="ComX" />
          <ThemeToggle onClick={() => setIsLight(!isLight)}>
            <ThemeLabel>Light</ThemeLabel>
            <Sun size={20} />
          </ThemeToggle>
          <VerticalDivider />
          <ChevronRight size={16} />
          <BalanceSection>
            <BalanceItemComponent label="CASH BALANCE" amount="₦8,374,763" />
            <BalanceItemComponent
              label="SECURITIES VALUE"
              amount="₦8,374,763"
            />
            <BalanceItemComponent label="LOAN BALANCE" amount="₦7,542,246" />
          </BalanceSection>
          <VerticalDivider />
          <DemoSection>
            <DemoButton>DEMO</DemoButton>
            <ChevronButton>
              <ChevronDown size={16} />
            </ChevronButton>
          </DemoSection>
        </TopBar>

        <Sidebar>
          <SidebarItemComponent
            icon={<Grid size={24} />}
            label="Overview"
            active={activeSection === "overview"}
            onClick={() => setActiveSection("overview")}
          />
          <SidebarItemComponent
            icon={<LineChart size={26} />}
            label="Market"
            active={activeSection === "market"}
            onClick={() => setActiveSection("market")}
          />
          <SidebarItemComponent
            icon={<Briefcase size={26} />}
            label="Portfolio"
            active={activeSection === "portfolio"}
            onClick={() => setActiveSection("portfolio")}
          />
          <SidebarItemComponent
            icon={<Users size={26} />}
            label="Community"
            active={activeSection === "community"}
            onClick={() => setActiveSection("community")}
          />
          <SidebarItemComponent
            icon={<FileText size={26} />}
            label="Reports"
            active={activeSection === "reports"}
            onClick={() => setActiveSection("reports")}
          />
          <SidebarItemComponent
            icon={<Settings size={26} />}
            label="Settings"
            active={activeSection === "settings"}
            onClick={() => setActiveSection("settings")}
          />
        </Sidebar>

        <SidePanel>
          <SearchBar placeholder="Search" />
          <SidePanelItem>
            <LineChart size={20} />
            Product View
          </SidePanelItem>
          <SidePanelItem active>
            <FileText size={20} />
            Order Book
          </SidePanelItem>
          <SidePanelItem>
            <Clock size={20} />
            Price History
          </SidePanelItem>
          <SidePanelItem>
            <Eye size={20} />
            Open Orders
          </SidePanelItem>
          <SidePanelItem>
            <CheckCircle size={20} />
            Closed Trades
          </SidePanelItem>
          <SidePanelItem>
            <XCircle size={20} />
            Cancelled Trades
          </SidePanelItem>
        </SidePanel>

        <MainContent>
          <FilterContainer>
            <FilterTabs>
              <FilterTab>Board</FilterTab>
              <FilterTab active>X-Traded</FilterTab>
              <FilterTab>OTC</FilterTab>
              <FilterTab>FI</FilterTab>
              <FilterTab>Derivatives</FilterTab>
            </FilterTabs>
            <FilterTabs>
              <FilterTab>Product</FilterTab>
              <FilterTab active>All</FilterTab>
              <FilterTab>SMAZ</FilterTab>
              <FilterTab>SBBS</FilterTab>
              <FilterTab>SPRL</FilterTab>
              <FilterTab>SGNG</FilterTab>
              <FilterTab>SSGM</FilterTab>
              <FilterTab>FETC</FilterTab>
              <FilterTab>SCOC</FilterTab>
            </FilterTabs>
          </FilterContainer>

          <TableContainer>
            <TableCard>
              <Table>
                <thead>
                  <tr>
                    <Th>Products</Th>
                    <Th>Quantity</Th>
                    <Th>Bid Price</Th>
                    <Th></Th>
                  </tr>
                </thead>
                <tbody>
                  {buyData.map((item, index) => (
                    <tr key={index}>
                      <Td>{item.products}</Td>
                      <Td>{item.quantity}</Td>
                      <PriceCell type="bid">{item.bidPrice}</PriceCell>
                      <Td>
                        <ActionButton variant="buy">Buy</ActionButton>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableCard>

            <TableCard>
              <Table>
                <thead>
                  <tr>
                    <Th>Products</Th>
                    <Th>Quantity</Th>
                    <Th>Offer Price</Th>
                    <Th></Th>
                  </tr>
                </thead>
                <tbody>
                  {sellData.map((item, index) => (
                    <tr key={index}>
                      <Td>{item.products}</Td>
                      <Td>{item.quantity}</Td>
                      <PriceCell type="offer">{item.offerPrice}</PriceCell>
                      <Td>
                        <ActionButton variant="sell">Sell</ActionButton>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableCard>
          </TableContainer>

          <TradeLogCard>
            <h3 style={{ marginBottom: "16px", color: "#111827" }}>
              TRADE LOG
            </h3>
            <TradeLogTable>
              <thead>
                <tr>
                  <Th>Security</Th>
                  <Th>Board</Th>
                  <Th>Order Type</Th>
                  <Th>Matched Price</Th>
                  <Th>Quantity</Th>
                  <Th>Date</Th>
                  <Th>Time</Th>
                </tr>
              </thead>
              <tbody>
                {tradeLogData.map((item, index) => (
                  <tr key={index}>
                    <Td>{item.security}</Td>
                    <Td>{item.board}</Td>
                    <Td>
                      <span
                        style={{
                          color:
                            item.orderType === "Buy" ? "#1E1E1E" : "#1E1E1E",
                          padding: "4px 8px",
                        }}
                      >
                        {item.orderType}
                      </span>
                    </Td>
                    <Td>{item.matchedPrice}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.time}</Td>
                  </tr>
                ))}
              </tbody>
            </TradeLogTable>
          </TradeLogCard>
        </MainContent>
      </Layout>

      <LiveMarketTicker>
        <TickerHeader>Live Market</TickerHeader>
        <TickerContent>
          <TickerItem>
            <TickerLabel>Soybean (SBBS)</TickerLabel>
            <TickerValue>₦30,834.59</TickerValue>
          </TickerItem>
          <TickerItem>
            <TickerLabel>Sorghum (SSGM)</TickerLabel>
            <TickerValue>₦30,834.59</TickerValue>
          </TickerItem>
          <TickerItem>
            <TickerLabel>Soybean (SBBS)</TickerLabel>
            <TickerValue>₦30,834.59</TickerValue>
          </TickerItem>
          <TickerItem>
            <TickerLabel>Maize (SMAZ)</TickerLabel>
            <TickerValue>₦30,834.59</TickerValue>
          </TickerItem>
          <TickerItem>
            <TickerLabel>Paddy Rice (SPRL)</TickerLabel>
            <TickerValue>₦30,834.59</TickerValue>
          </TickerItem>
          <TickerItem>
            <TickerLabel>Cocoa (SCOC)</TickerLabel>
            <TickerValue>₦30,834.59</TickerValue>
          </TickerItem>
          <TickerItem>
            <TickerLabel>Soybean (SBBS)</TickerLabel>
            <TickerValue>₦30,834.59</TickerValue>
          </TickerItem>
          <TickerItem>
            <TickerLabel>Soybean (SBBS)</TickerLabel>
            <TickerValue>₦30,834.59</TickerValue>
          </TickerItem>
        </TickerContent>
      </LiveMarketTicker>
    </>
  );
};

export default TradingInterface;
