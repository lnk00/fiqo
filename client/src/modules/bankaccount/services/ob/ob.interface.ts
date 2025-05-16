export interface IOBService {
  startAggregFlow: () => Promise<void>;
  handleAggregCallback: () => Promise<string>;
}
