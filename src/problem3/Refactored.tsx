  // I have improved and refactored the messy code and explained how to update of code below
  
  interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }

  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    // Declare object mapping for blockchain priority
    const blockchainPriorityValues: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
  
    // Update getPriority using blockchainPriority
    const getPriority = (blockchain: string): number =>
      blockchainPriorityValues[blockchain] ?? -99;
  
    // Filter, sort and format balances on one useMemo function
    const processedBalances = useMemo(() => {
      return balances
        .filter((balance: WalletBalance) => {
          const priority = getPriority(balance.blockchain);
          return priority > -99 && balance.amount > 0;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
        .map((balance: WalletBalance) => ({
          ...balance,
          formatted: balance.amount.toFixed(),
        }));
    }, [balances]);
  
    // Update and map to rows on useMemo to prevent unnecessary rerendering
    // Always render latest updated component when processedBalances and prices changed
    const rows = useMemo(() => {
      return processedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      });
    }, [processedBalances, prices]);
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  };
  