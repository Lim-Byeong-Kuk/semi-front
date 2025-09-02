import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

// 기본값 특별한(?) 변수에 "qna:items"를 넣어 지정했다. 
// 즉 기본값은 "qna:items" 다.
const STORAGE_KEY = "qna:items";

// 예시화면이다.
const INITIAL_ITEMS = [
  {
    id: 1,
    number: 1,
    title: "중순까지 배달 가능한가요?",
    content: "가능하면 날짜 맞춰 보내주세요!",
    writer: "조*우",
    date: "2025.09.01",
    images: [
      "https://akan.co.kr/upload/products/NEVER/KYJN5004/thumb-single-graybg.webp",
    ],
    href: "#",
  },
  {
    id: 1,
    number: 1,
    title: "언제 배송 되나요?",
    content: "주문번호 12345 입니다.",
    writer: "김*라",
    date: "2025.09.01",
    images: [
      "https://akan.co.kr/upload/products/MDBUMP/AQ9999/thumb-single-graybg.webp",
    ],
    href: "#",
  },
];

// 실시간 날짜 데이터 
// fmtDate의 파라미터는 d이고 d는 new Date 생성자를 받는다.
// 그리고 이것은 string 형태이다.
const fmtDate = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
};

// 지피티 해석
// File[] -> Promise<string[]> (dataURL 배열)
// 모든  파일을 병렬로 읽어 data URL 문자열 배열을 돌려주는 promise를 만든다.
// Promise.all([...]): 위에서 만든 여러 Promise를 한 번에 기다렸다가
//전부 성공하면 동일한 순서의 data URL 배열로 resolve
//하나라도 실패하면 전체가 reject
const filesToDataUrls = (files) =>
  Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader(); //reader를 통해서 filtReader 생성자를 만들어주었다.
          reader.onload = () => resolve(reader.result); // onload를 실행하면 () 함수 형태로 만들어지고 이 file이 허락 되면
          // resolve에 reader.result 파라미터를 넣는다.
          reader.onerror = reject; // 에러가 뜨면 거절한다.
          reader.readAsDataURL(file); //전부 성공할 시 readAsDataUrl이라는 메소드로 file을 읽어온다. 
        })
    )
  );

export default function QandAComponent() {
  // 모달 
  // AskOpen/Detail 패널이 열렸는지 확인하고 버튼 등에서 set을 호출해 화면에 다시 그려낸다.
  // useState(초기값)은 [현재값, 값을바꾸는함수] 한 쌍을 돌려준다. (계속 썼는데도 계속 까먹으니 꼭 기억할 것)
  //여기서는 둘 다 불리언 상태고, 초기값이 false(닫힘)이다.

  const [isAskOpen, setAskOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);

  // 폼 
  // title, content, writer의 초기값을 지정해준다.
  const [form, setForm] = useState({ title: "", content: "", writer: "" });

  // 상세 보기
  // 초기값을 null 로 지정해주었다.
  const [selectedItem, setSelectedItem] = useState(null);

  // 목록 (localStorage 복원)
  // try catch를 사용했다. localstorage에 저장된 값으로 items 상태를 초기화하고
  // 문제가 있으면 기본값으로 되돌아가는 패턴이다. 
  const [items, setItems] = useState(() => { //변수 이름을 만들데에는 누구나 읽을 수 있게 만들 것.
    try {
      const raw = localStorage.getItem(STORAGE_KEY); //raw에 localstroage 지정
      return raw ? JSON.parse(raw) : INITIAL_ITEMS;  //값이 있으면 raw로 return 값이 없으면 INITIAL_ITEMS로 지정
    } catch {
      return INITIAL_ITEMS; // 에러가 뜰 때를 대비해서 에러가 뜰 시 기본값이 나오도록 설정
    }
  });

  // 파일 첨부 (dataURL로 보관) + 미리보기
  const [images, setImages] = useState([]); // string[] (dataURL)
  const fileRef = useRef(null);

  // navigate에 useNavigate() 메소드를 넣어 만든 뒤
  //moveToImgHandler에 navigate를 적용한다. 즉, moveToImgHandler에 navigate의 link가 들어간다.
  const navigate = useNavigate();
  const moveToImgHandler = () => navigate("/phonecase/1");

  // ESC로 모달 닫기
  useEffect(() => { // useEffect를 통해 (useEffect는 동기화 등이 들어간다.)
    const onKey = (e) => { // event가 가능한 onkey를 만든다.
      if (e.key === "Escape") { //e.key === "escape" 즉, 내가 누른 키가 esc면
        setAskOpen(false);  //askopen이 false로 실행되고
        setDetailOpen(false); //detailopen이 false로 실행된다.
      }
    };
    document.addEventListener("keydown", onKey); //문서의 전체에서 감지. 
    return () => document.removeEventListener("keydown", onKey); //클린업, 같은 참조의 onkey로 제거해서 메모리 누수/중복 리스터를 막는다.

  }, []);

  // 모달 열리면 스크롤 잠금 
  // 이것은 style 의 overflow:hidden을 써서 쉽다.
  // html.style.overflow = 가 isAskOpen || (OR 연산자) 이거나 isDetailOpen이면 hidden을 하고 아니면 아무런 overflow도 달지 않는다.
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = isAskOpen || isDetailOpen ? "hidden" : "";
    return () => {
      html.style.overflow = ""; //html 즉 전역을 사용하기 때문에 원래대로 복구하는 return도 필요하다. (중괄호를 썼기에 필요하기도 하다.)
    };
  }, [isAskOpen, isDetailOpen]);

  // items 변경 → localStorage 저장
  useEffect(() => {

    // 기존 코드
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    // localStorageService api 를 사용하여 localStorage 에 저장하도록 변경
    


  }, [items]);

  // 안전한 next id
  const nextId = useMemo(
    () => (items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1),
    [items]
  );

  // 폼 핸들러를 만든 것이다. form 태그 유무와 다르게 여러 입력 필드의 상태를 관리하는 로직이라서
  // 관습적으로 폼 핸들러라고 부른다. 즉, 이 handlechange는 name과 value를 통해서 e.target을
  // 지정한 뒤 setForm에서 s를 나열한 뒤 계산된 [name] 에서 새 value를 할당해 해당 필드만 업데이트 한다.
  // 그래서 만들어 놓은 핸들러 체인지이다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // 파일 선택 
  // 이것 또한 핸들러처럼 파일 선택 함수이다. async (e) 를 활용한다.
  // 여기서 const picked 을 만들어준다. picked은 array에서 나온 e.targetfiles or 빈 배열이다
  // 만약 picked의 length가 아닐 시 리턴한다. picked.length가 === 0 일 시 return 이다!
  // 이벤트 핸들러에서 return 값은 무시된다. 즉, 여기서는 조기 종료 용도이다.
  const onPickFiles = async (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;


    // 간단한 검증 (용량/타입)
    const MAX_FILES = 5; //max_files 를 5로 적용
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB // max_size를 2MB로 적용 즉 1024 * 1024는 1MB이다.
    const filtered = picked //picked 에서
      .slice(0, MAX_FILES) // slice 메소드로 (0, max_files) 파라미터를 만들어 slice 한다.
      .filter((f) => f.type.startsWith("image/") && f.size <= MAX_SIZE); // 그리고
      // filter 메소드를 적용해 f 변수에 f.type.startWith("images/") && (그리고) f.size <= max_size로 한다.
      //즉 f.type.startWith("image/")와 f.size는 max_size보다 작거나 같다.

    if (!filtered.length) {
      alert("이미지 파일(2MB 이하)만 업로드 가능합니다.");
      if (fileRef.current) fileRef.current.value = ""; //fileRef.current.value를 "" 로 칭한다.
      return; //대괄호를 썼기에 return을 한다.
    }

    try {
      const dataUrls = await filesToDataUrls(filtered); // 앞의 async를 쓴 이유가 여기서 나온다.
      // await을 여기서 쓰기 때문이다. async 함수는 promise를 돌려준다는 선언이고 await은 promise가 끝날 때 까지
      // 이 함수의 실행을 잠시 멈추고 결과를 받아오라는 뜻이다. 
      //즉 await이 나온 이 순간 잠시 멈추고 await filesToDataUrls(filtered)을 dataUrls에 넣는다.
      setImages(dataUrls); // dataURL로 보관 → localStorage 저장 가능
    } catch (err) {
      console.error(err);
      alert("파일 변환 중 오류가 발생했습니다."); //에러 발생시 alert이 뜨게 한다.
    }
  };

  // 제출 
  // 파일과 함께 전송하는 핸들러 이벤트이다.
  const handleSubmitWithFile = (e) => {
    e.preventDefault(); //폼 제출 전 새로고침, 페이지 이동 없이 잠시 멈추어라
    // 이 이벤트에 연결된 브라우저의 기본 동작을 막으라는 뜻이다.

    const title = form.title.trim(); 
    // trim()은 form title의 앞뒤 공백 문자를 제거해 새 문자열로 반환하는 메서드이다.
    const content = form.content.trim();
    const writer = (form.writer || "익명").trim();

    if (!title || !content) { //만약 타이틀 또는 콘텐츠가 아닐 시
      alert("제목과 내용을 입력해주세요."); //이 알람이 뜨게 한다.
      return; // 중괄호 썼으니 return
    }

    const newItem = { //newItem 정의
      id: nextId,
      number: nextId,
      title,
      content,
      writer,
      date: fmtDate(),
      images, // dataURL 배열 (첫 이미지를 썸네일로 사용)
      href: "#",
    };

    setItems((prev) => [newItem, ...prev]); // 배열 앞에 newItem을 추가하고 그 뒤에 기존 배열(prev)의
    // 원소들을 펼쳐 붙여 새 배열을 만든다. (키와 밸류는 객체에서 쓰는 개념이고 지금은 배열 연산이다.)
    // prev는 변경되지 않고 그대로 유지된다. (불변성이 유지된다.)
    // 그러기에 불변성이 유지 되는 이전 상태 prev를 안전하게 참조해 새 값을 만드는 것이다.

    // 리셋
    setForm({ title: "", content: "", writer: "" }); //초기화
    setImages([]); //초기화
    if (fileRef.current) fileRef.current.value = ""; //만약 fileRef.current라면 value를 초기화한다.
    setAskOpen(false); //setaskopen 또한 false로 바꾼다.
    
  };

  //html part
  return (
    <div className="min-h-dvh bg-white text-gray-900">
      {/* 헤더/컨테이너 */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-6">
        <h1 className="text-2xl font-bold text-center mb-4">Q&amp;A</h1>

        {/* 리스트 */}
        <div className="border rounded-xl overflow-hidden divide-y divide-gray-200">
          {items.map((it) => (
            <div
              key={it.id}
              className="grid items-center gap-4 p-4 text-center md:text-left md:grid-cols-[90px_220px_1fr_110px_120px]"
            >
              <div className="text-gray-600">{it.number}</div>

              <a
                href={it.href}
                className="justify-self-center"
                onClick={(e) => e.preventDefault()}
              >
                {it.images?.[0] ? (
                  <img
                    src={it.images[0]} // dataURL 또는 http URL
                    alt=""
                    className="w-[220px] h-auto object-contain bg-gray-50 rounded-md"
                    loading="lazy"
                    onClick={moveToImgHandler} //클릭 시 미리 만든 moveToIImgHandler 사용
                  />
                ) : (
                  <div
                    className="w-[220px] h-[140px] flex items-center justify-center bg-gray-50 rounded-md"
                    onClick={moveToImgHandler} //클릭 시 미리 만든 moveToIImgHandler 사용
                  >
                    <TbMessageCircleQuestion className="text-3xl text-gray-400" />
                  </div>
                )}
              </a>

              <div className="min-w-0 break-words">
                <button
                  type="button"
                  className="no-underline text-left text-gray-900 hover:underline"
                  onClick={() => {
                    setSelectedItem(it);
                    setDetailOpen(true); //클릭시 setDetailOpen이 true로 바뀐다.
                  }}
                >
                  {it.title}
                </button>
              </div>

              <div className="text-gray-700 md:text-center">{it.writer}</div>
              <div className="text-gray-700 md:text-right">{it.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세(읽기) 모달 */}
      <div
        aria-hidden={!isDetailOpen}
        role="presentation"
        onClick={() => setDetailOpen(false)}
        className={[
          "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity",
          isDetailOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="detailTitle"
          onClick={(e) => e.stopPropagation()} //이 요소 안을 클릭해도 이벤트가 부모로 버블링되지 않게 막아준다.
          // 여기서 버블링이란? 이벤트 타겟이 위로 올라가 부모 핸들러들도 호출되는 것
          className={[
            "w-[min(90vw,640px)] rounded-2xl bg-white p-6 transition-transform shadow-2xl",
            isDetailOpen ? "translate-y-0" : "translate-y-2",
          ].join(" ")} //클래스들을 배열로 모아 join("") 해서 하나의 class 문자열로 만든다.
        >
          <h2
            id="detailTitle"
            className="text-xl font-semibold mb-4 text-center"
          >
            질문 상세
          </h2>

          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="block text-sm font-medium mb-1">제목</div>
                  <input
                    value={selectedItem.title}
                    readOnly
                    className="w-full rounded-md border px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <div className="block text-sm font-medium mb-1">작성자</div>
                  <input
                    value={selectedItem.writer}
                    readOnly
                    className="w-full rounded-md border px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="block text-sm font-medium mb-1">등록일</div>
                <input
                  value={selectedItem.date}
                  readOnly
                  className="w-full rounded-md border px-3 py-2 outline-none"
                />
              </div>

              <div>
                <div className="block text-sm font-medium mb-1">내용</div>
                <textarea
                  value={selectedItem.content}
                  readOnly
                  rows={5}
                  className="w-full rounded-md border px-3 py-2 outline-none resize-y"
                />
              </div>

              {/* 첨부 미리보기 (여러 장) */}
              <div>
                <div className="block text-sm font-medium mb-2">
                  첨부 이미지
                </div>
                {selectedItem.images?.length ? (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedItem.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="w-full h-24 object-contain rounded border"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">첨부 이미지가 없습니다.</div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDetailOpen(false)}
                  className="px-4 py-2 rounded-md border"
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 질문하기 버튼 */}
      <button
        type="button"
        onClick={() => setAskOpen(true)}
        aria-label="질문하기"
        className="group fixed right-6 bottom-6 inline-flex items-center gap-2 px-4 py-3 rounded-full text-white font-semibold no-underline isolate overflow-hidden shadow-lg bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        <span className="relative z-10">질문하기</span>
        <span className="absolute inset-0 bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </button>

      {/* 질문하기 모달 */}
      <div
        aria-hidden={!isAskOpen} //스크린 리더용 ARIA 속성 모달/오버레이 만들 때 자주 쓰인다. 
        //이 노드의 자식들을 접근성 트리에서 숨겨라 (효과: 스크린 리더에 안 읽힘 하지만 포커스는 막지 않음)
        role="presentation"
        onClick={() => setAskOpen(false)}
        className={[
          "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity",
          isAskOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          role="dialog"
          aria-modal="true" //이 요소가 모달 대화상자임을 스크린 리더에 알려
          // 배경 콘텐츠를 접근성 트리에서 제외하도록 힌트를 주는 속성 
          //반드시 role="dialog" 또는 role="alertdialog"와 함께 쓴다.
          aria-labelledby="askTitle" //이 요소의 이름(라벨) 은 저 요소의 텍스트로 삼아라
          onClick={(e) => e.stopPropagation()}
          className={[
            "w-[min(90vw,520px)] rounded-2xl bg-white p-6 transition-transform shadow-2xl",
            isAskOpen ? "translate-y-0" : "translate-y-2",
          ].join(" ")}
        >
          <h2 id="askTitle" className="text-xl font-semibold mb-4">
            질문하기
          </h2>

          <form onSubmit={handleSubmitWithFile} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">제목</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="제목을 적어주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">내용</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400 resize-y"
                placeholder="무엇이 궁금한가요?"
              />
            </div>

            {/* 파일 첨부 */}
            <div className="flex items-center gap-3">
              <input
                ref={fileRef}
                id="qna-file"
                type="file"
                accept="image/*"
                multiple
                onChange={onPickFiles}
                className="hidden"
              />
              <label
                htmlFor="qna-file"
                className="inline-flex items-center gap-2 cursor-pointer text-sky-600 hover:text-sky-700"
                title="이미지 첨부"
              >
                <FaPhotoVideo size={20} aria-hidden="true" />
                이미지 첨부
              </label>

              {/* 미리보기 (첫 3장) */}
              <div className="flex gap-2">
                {images.slice(0, 3).map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-12 w-12 rounded object-cover border"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">작성자</label>
              <input
                name="writer"
                value={form.writer}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="예) 김*라"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600"
              >
                보내기
              </button>
              <button
                type="button"
                onClick={() => setAskOpen(false)}
                className="px-4 py-2 rounded-md border"
              >
                닫기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
