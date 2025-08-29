import { useEffect, useRef, useState } from "react";

export default function MainComponent() {
  // 섹션 E 스크롤 트리거
  const secERef = useRef(null);
  const [activeE, setActiveE] = useState(false);

  useEffect(() => {
    const el = secERef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveE(true);
          io.disconnect(); // 한 번만
        }
      },
      { root: null, threshold: 0.2 } // 화면 20% 보이면 발동
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans text-black">
      {/* 메인 슬라이드 */}
      <div className="relative w-full aspect-[16/9] max-h-[70vh] overflow-hidden">
        {/* 1 */}
        <img
          src="https://cdn.pixabay.com/photo/2022/09/05/17/15/vancouver-7434702_1280.jpg"
          alt="슬라이드 예시1"
          className="absolute inset-0 h-full w-full object-contain 
               animate-[slide_12s_infinite] [animation-delay:0s] will-change-[opacity,transform]"
          style={{ opacity: 0 }}
        />
        {/* 2 */}
        <img
          src="https://cdn.pixabay.com/photo/2025/08/11/10/07/milky-way-9767930_1280.jpg"
          alt="슬라이드 예시2"
          className="absolute inset-0 h-full w-full object-contain 
               animate-[slide_12s_infinite] [animation-delay:4s] will-change-[opacity,transform]"
          style={{ opacity: 0 }}
        />
        {/* 3 */}
        <img
          src="https://cdn.pixabay.com/photo/2024/12/29/00/12/dog-9297049_1280.jpg"
          alt="슬라이드 예시3"
          className="absolute inset-0 h-full w-full object-contain
               animate-[slide_12s_infinite] [animation-delay:8s] will-change-[opacity,transform]"
          style={{ opacity: 0 }}
        />
      </div>
      {/* mainContent2 (A/B) */}
      <section
        id="mainContent2"
        className="mx-auto max-w-6xl px-4 py-10 flex flex-col gap-6 md:flex-row"
      >
        <div
          id="mainContentA"
          className="flex-1 rounded-lg bg-beige-100/70 bg-[#f5f5dc] p-6 transition-transform duration-300 hover:scale-[1.05] shadow"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam illo
          earum quidem id, accusamus non ut possimus sequi dolores tempore
          tenetur! Sequi adipisci sit quam illum. Perspiciatis fugiat minus
          reprehenderit.
        </div>

        <div
          id="mainContentB"
          className="flex-[2] rounded-lg bg-gray-400 p-6 transition-transform duration-300 hover:scale-[1.05] shadow"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          sequi modi, expedita odio ipsum cumque tenetur iure obcaecati fugiat
          fugit. Qui nobis quas facere veritatis necessitatibus nesciunt
          voluptatibus error fugit quidem fuga officia repellendus vero alias
          voluptatem quia hic commodi magni nihil quos aliquam consequatur amet,
          numquam dicta. Velit inventore esse a debitis, neque aperiam
          necessitatibus facilis vitae labore cumque eveniet ipsam quo, nam odio
          omnis nisi obcaecati iusto modi dolores totam exercitationem.
          Cupiditate nostrum, doloribus adipisci dicta labore sunt eum?
          Distinctio, ipsam. Quasi, exercitationem ea labore, reiciendis
          repellat repudiandae molestias sapiente modi, magni non iure nihil
          vero beatae architecto facere. Cum rem, suscipit consectetur
          voluptatum earum est omnis corrupti perferendis necessitatibus sunt
          vitae ullam! Placeat eaque provident, quaerat sapiente vel est iure
          sunt aut, facere voluptas, illum quod asperiores quo quae. Nostrum,
          consectetur blanditiis! Dicta labore officiis ut, sapiente odit,
          cumque provident minus veniam nostrum natus, doloremque facilis
          voluptatem ullam. Nostrum sint voluptates saepe aspernatur laudantium
          quidem recusandae quia labore molestias itaque. Quia voluptas ipsam
          vero omnis provident earum, doloremque, saepe vitae itaque ea quaerat
          quasi eveniet et! Vero aspernatur molestias porro sapiente magni
          similique repellat sequi placeat doloribus id? Eaque debitis, adipisci
          corporis quas placeat omnis hic reprehenderit.
        </div>
      </section>

      {/* 배경 섹션 1 */}
      <section
        id="background-img"
        className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat px-4 py-10"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2023/08/23/14/05/brienzer-rothorn-8208608_1280.jpg')",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="contentC mb-10 flex h-[300px] items-start justify-between gap-6 rounded-lg bg-white p-10 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
            <p className="w-full overflow-hidden text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              laudantium...
            </p>
            <p className="w-full overflow-hidden text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              laudantium...
            </p>
          </div>

          <div className="contentD h-[300px] overflow-hidden rounded-lg bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
            <p className="overflow-hidden text-black text-ellipsis">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              laudantium...
            </p>
          </div>
        </div>

        {/* 배경 섹션 2 (스크롤 트리거) */}
        <div id="mainContent3" className="mx-auto max-w-6xl">
          <div
            id="background-img2"
            className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat px-4 py-10"
            style={{
              backgroundImage:
                "url('https://cdn.pixabay.com/photo/2025/07/14/16/59/kananaskis-9714444_1280.jpg')",
            }}
          >
            <section
              id="ContentE"
              ref={secERef}
              className="flex center mt-10"
              aria-label="Scroll Reveal Cards"
            >
              {/* A */}
              <div
                className={[
                  "mt-10 h-[500px] w-1/4 overflow-hidden rounded-md bg-pink-300 p-4",
                  "opacity-0 -translate-x-10 transition-all duration-700 will-change-transform will-change-opacity",
                  activeE && "opacity-100 translate-x-[25%] delay-[0ms]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Vitae, necessitatibus.
                </p>
              </div>

              {/* B */}
              <div
                className={[
                  "mt-10 h-[500px] w-1/4 overflow-hidden rounded-md bg-fuchsia-300 p-4",
                  "opacity-0 -translate-x-10 transition-all duration-700 will-change-transform will-change-opacity",
                  activeE && "opacity-100 translate-x-[50%] delay-[150ms]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                  fuga est blanditiis totam debitis quisquam nulla consectetur
                  adipisci quis accusamus.
                </p>
              </div>

              {/* C */}
              <div
                className={[
                  "mt-10 h-[500px] w-1/4 overflow-hidden rounded-md bg-sky-300 p-4",
                  "opacity-0 -translate-x-10 transition-all duration-700 will-change-transform will-change-opacity",
                  activeE && "opacity-100 translate-x-[75%] delay-[300ms]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Pariatur, reprehenderit?
                </p>
              </div>
              {/* 정렬을 위해 만들었습니다. */}
              <div
                className={[
                  "mt-10 h-[500px] w-1/4 overflow-hidden rounded-md bg-transparent",
                  "opacity-0 -translate-x-10 transition-all duration-700 will-change-transform will-change-opacity",
                  activeE && "opacity-100 translate-x-[100%] delay-[300ms]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
