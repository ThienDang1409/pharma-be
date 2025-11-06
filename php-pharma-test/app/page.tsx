import Layout from "./components/Layout";
import HeroSlider from "./components/HeroSlider";
import CompanyBanner from "./components/CompanyBanner";
import ProductCategories from "./components/ProductCategories";
import LatestNews from "./components/LatestNews";

export default function Home() {
  return (
    <Layout>
      <HeroSlider />
      <CompanyBanner />
      <ProductCategories />
      <LatestNews />
    </Layout>
  );
}
