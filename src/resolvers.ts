import { v4 } from "uuid";
import {
  AcquisitionCampaignWithInternal,
  Resolvers,
  Retailer,
} from "./types/generated";

// Mock data
const retailers: Retailer[] = [
  {
    idPool: "1",
    idClient: "abc",
    name: "Retailer 1",
  },
  {
    idPool: "2",
    idClient: "abc",
    name: "Retailer 2",
  },
  {
    idPool: "3",
    idClient: "abc",
    name: "Retailer 3",
  },
  {
    idPool: "4",
    idClient: "abc",
    name: "Retailer 4",
  },
];

const campaigns: AcquisitionCampaignWithInternal[] = [];

const users = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

export const resolvers: Resolvers = {
  Query: {
    retailersByClientDomain: (_, { input }) => {
      const limit = input?.limit || 10;

      return {
        retailers: retailers.slice(0, limit),
      };
    },
    getAcquisitionCampaign: (_, { id: campaignId }) => {
      const campaign = campaigns.find((x) => x.id === campaignId);
      if (!campaign) {
        return { campaign: null };
      }

      const { id, bonusType, bonusAmount, retailers } = campaign;
      return {
        campaign: { id, bonusType, bonusAmount, retailers },
      };
    },
    getInternalAcquisitionCampaign: (_, { input }) => {
      if (!input) {
        throw new Error("Input is required!");
      }

      const { id, item } = input;
      const campaign = campaigns.find((x) => x.id === id);
      if (campaign && item) {
        campaign.itemId = item.id;
        campaign.name = item.name;
        campaign.pageUrl = item.url;
        campaign.collectionId = item.collection;
      }

      return { campaign };
    },
    getAcquisitionCampaigns: (_, { input }) => {
      if (!input) {
        throw new Error("Input is required!");
      }

      const matches = input.items.map((item) => {
        const campaign = campaigns.find(
          (x) => x.itemId === item.id && x.collectionId === item.collection
        );

        if (!campaign) {
          return null;
        }

        campaign.itemId = item.id;
        campaign.name = item.name;
        campaign.pageUrl = item.url;
        campaign.collectionId = item.collection;

        return campaign;
      });

      return { campaigns: matches };
    },
  },
  Mutation: {
    upsertAcquisitionCampaign: (_, { input }) => {
      if (!input) {
        throw new Error("Input is required!");
      }

      const { idClient, item, data } = input;
      const campaign: AcquisitionCampaignWithInternal = {
        id: v4(),
        idClient: idClient,

        itemId: item.id,
        collectionId: item.collection,
        pageUrl: item.url,
        name: item.name,

        startDate: data.startDate,
        endDate: data.endDate,
        retailers: data.retailers,
        campaignType: data.campaignType,

        bonusType: data.bonusType,
        bonusAmount: data.bonusAmount,

        costModel: data.costModel,
        costModelAmount: data.costModelAmount,

        adsetId: data.adsetId,
        agency: data.agency,
        channel: data.channel,
        subChannel: data.subChannel,
        device: data.device,
        medium: data.medium,
      };
      campaigns.push(campaign);

      return { campaign };
    },
  },
};
