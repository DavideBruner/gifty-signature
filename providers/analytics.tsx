import UmamiProvider, { useUmami } from "@/modules/analytics";

interface UmamiProps {
  src?: string;
  /**
   * Website ID found in Umami dashboard. https://umami.is/docs/collect-data
   */
  websiteId: string;
  /**
   * By default, Umami will send data to wherever the script is located. You can override this to send data to another location.
   */
  hostUrl?: string;
  /**
   * By default, Umami tracks all pageviews and events for you automatically. You can disable this behavior and track events yourself using the tracker functions.
   */
  autoTrack?: boolean;
  /**
   * If you want the tracker to only run on specific domains, you can add them to your tracker script. This is a comma delimited list of domain names. Helps if you are working in a staging/development environment.
   */
  domains?: string | string[];
}

export const Analytics = ({
  enabled = true,
  ...options
}: { enabled?: boolean } & UmamiProps) => {
  if (!enabled) return null;
  return <UmamiProvider {...options} />;
};

export const useAnalytics = useUmami;
