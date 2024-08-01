import Layout from "../components/Layout";
import ChatSection from "../components/chat-section";


export default function Home({ user, paragonUserToken }) {

  return (
    <Layout title="Rag">
      <section className="todoapp">
            <div className="h-[65vh] flex">
              <ChatSection />
            </div>
      </section>
    </Layout>
  );
}
