import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import TodoApp from "../components/TodoApp";
import TodoModel from "../components/TodoModel";
import useParagon from "../hooks/useParagon";
import ChatSection from "../components/chat-section";


export default function Home({ user, paragonUserToken }) {
  const { paragon } = useParagon(paragonUserToken);

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
