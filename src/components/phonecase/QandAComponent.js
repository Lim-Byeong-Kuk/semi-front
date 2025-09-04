import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { LocalStorageService, storageEnum } from "../../api/storageApi";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { LoginContext } from "../../api/context/LoginContext";
// 예시 데이터
const INITIAL_ITEMS = [
  {
    qnaId: 1,
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
    qnaId: 2,
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

const fmtDate = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
};

const filesToDataUrls = (files) =>
  Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );

export default function QandAComponent() {
  const [isAskOpen, setAskOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", writer: "" });
  const [selectedItem, setSelectedItem] = useState(null);
  const {user, loginCheck} = useContext(LoginContext);

  // 저장소 복원 (+ number 제거 정규화)
  const [items, setItems] = useState(() => {
    const raw = LocalStorageService.findAllByCollection(storageEnum.Collection.QnAs);
    console.log(raw);
    // const raw = LocalStorageService?.findAll?.(storageEnum.Class.QnA) || [];
    const data =
      Array.isArray(raw) && raw.length ? raw.slice() : INITIAL_ITEMS.slice();
    data.sort((a, b) => (b.qnaId ?? 0) - (a.qnaId ?? 0));
    const normalized = data.map(({ number, ...rest }) => rest);
    if (!raw.length) {
      LocalStorageService?.initData?.(storageEnum.Class.QnA, normalized);
    }
    return normalized;
  });

  const [images, setImages] = useState([]); // dataURL[]
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const moveToImgHandler = () => navigate("/phonecase/1");

  // ESC 닫기
  useEffect(() => {
    loginCheck();
    console.log(user);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setAskOpen(false);
        setDetailOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // 모달 시 스크롤 잠금
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = isAskOpen || isDetailOpen ? "hidden" : "";
    return () => (html.style.overflow = "");
  }, [isAskOpen, isDetailOpen]);

  // 안전한 다음 ID
  const nextId = useMemo(() => {
    if (!items.length) return 1;
    return Math.max(...items.map((i) => Number(i.qnaId ?? 0))) + 1;
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onPickFiles = async (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;

    const MAX_FILES = 5;
    const MAX_SIZE = 2 * 1024 * 1024;
    const filtered = picked
      .slice(0, MAX_FILES)
      .filter((f) => f.type.startsWith("image/") && f.size <= MAX_SIZE);

    if (!filtered.length) {
      alert("이미지 파일(2MB 이하)만 업로드 가능합니다.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    try {
      const dataUrls = await filesToDataUrls(filtered);
      setImages(dataUrls);
    } catch (err) {
      console.error(err);
      alert("파일 변환 중 오류가 발생했습니다.");
    }
  };

  const handleSubmitWithFile = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const content = form.content.trim();
    const writer = (form.writer || "익명").trim();
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newItem = {
      qnaId: nextId,
      id:user.id,
      title,
      content,
      writer,
      date: fmtDate(),
      images,
      href: "#",
    };

    try {
      // LocalStorageService?.saveByOne?.(storageEnum.Class.QnA, newItem);
      LocalStorageService.saveCollectionOne(storageEnum.Class.QnA, storageEnum.Collection.QnAs, newItem);
    } catch (e) {
      console.warn("LocalStorage 저장 실패:", e);
    }

    setItems((prev) => [newItem, ...prev]);
    setForm({ title: "", content: "", writer: "" });
    setImages([]);
    if (fileRef.current) fileRef.current.value = "";
    setAskOpen(false);
  };

  return (
    <div className="min-h-dvh bg-white text-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-6">
        <div className="relative">
          <div className="absolute left-4 text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200 hover:animate-wiggle">
            <Link to="/">
              <IoMdArrowBack size={22} />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">Q&amp;A</h1>
        </div>

        {/* 리스트 */}
        <div className="border rounded-xl overflow-hidden divide-y divide-gray-200">
          {items.map((it, idx) => {
            const displayNumber = items.length - idx; // 최신 1번
            return (
              <div
                key={it.qnaId}
                className="
          grid gap-4 p-4
          text-center items-center
          grid-cols-1
          md:grid-cols-[90px_220px_1fr_110px_120px]
        "
              >
                {/* 번호 */}
                <div className="text-gray-600 justify-self-center">
                  {displayNumber}
                </div>

                {/* 이미지 */}
                <a
                  href={it.href}
                  className="justify-self-center"
                  onClick={(e) => e.preventDefault()}
                  aria-label="상품 이미지 보기"
                >
                  {it.images?.[0] ? (
                    <img
                      src={it.images[0]}
                      alt=""
                      className="w-[220px] h-auto object-contain bg-gray-50 rounded-md"
                      loading="lazy"
                      onClick={moveToImgHandler}
                    />
                  ) : (
                    <div
                      className="w-[220px] h-[140px] flex items-center justify-center bg-gray-50 rounded-md"
                      onClick={moveToImgHandler}
                    >
                      <TbMessageCircleQuestion className="text-3xl text-gray-400" />
                    </div>
                  )}
                </a>

                {/* 제목 */}
                <div className="min-w-0 break-words text-center">
                  <button
                    type="button"
                    className="
              no-underline text-gray-900 hover:underline line-clamp-2 w-full
            "
                    title={it.title}
                    onClick={() => {
                      setSelectedItem(it);
                      setDetailOpen(true);
                    }}
                  >
                    {it.title}
                  </button>
                </div>

                {/* 작성자 */}
                <div className="text-gray-700 justify-self-center">
                  {it.writer}
                </div>

                {/* 날짜 */}
                <div className="text-gray-700 justify-self-center">
                  {it.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 상세 모달 */}
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
          onClick={(e) => e.stopPropagation()}
          className={[
            "w-[min(90vw,640px)] rounded-2xl bg-white p-6 transition-transform shadow-2xl",
            isDetailOpen ? "translate-y-0" : "translate-y-2",
          ].join(" ")}
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
                  <label className="block text-sm font-medium mb-1">제목</label>
                  <input
                    value={selectedItem.title}
                    readOnly
                    className="w-full rounded-md border px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    작성자
                  </label>
                  <input
                    value={selectedItem.writer}
                    readOnly
                    className="w-full rounded-md border px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">등록일</label>
                <input
                  value={selectedItem.date}
                  readOnly
                  className="w-full rounded-md border px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">내용</label>
                <textarea
                  value={selectedItem.content}
                  readOnly
                  rows={5}
                  className="w-full rounded-md border px-3 py-2 outline-none resize-y"
                />
              </div>

              <div>
                <div className="block text-sm font-medium mb-2">
                  첨부 이미지
                </div>
                {selectedItem.images?.length ? (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedItem.images.map((src, i) => (
                      <img
                        key={`${selectedItem.qnaId}-${i}`}
                        src={src}
                        alt=""
                        className="w-full h-24 object-contain rounded border"
                        loading="lazy"
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
        aria-hidden={!isAskOpen}
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
          aria-modal="true"
          aria-labelledby="askTitle"
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
