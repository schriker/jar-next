import Layout from "../components/Layout/Layout";

export interface LayoutHeadProps {
  title: string;
  ogImage: string;
  ogDescription: string;
}

export interface LayoutProps extends LayoutHeadProps {
  children: React.ReactNode;
}