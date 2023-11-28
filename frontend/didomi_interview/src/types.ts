export type ConsentType = {
  id: string;
  name: string;
  email: string;
  receiveNewsletter?: boolean;
  showTargetedAds?: boolean;
  contributeToStatistics?: boolean;
};

export type ConsentJSONResponse = {
  data?: Array<ConsentType>;
  errors?: Array<{ message: string }>;
};
