export interface IOBService {
  startAggregFlow: () => Promise<void>;
  handleAggregCallback: () => string;
}
