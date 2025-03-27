export default function Join() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-black">
        <h2 className="text-2xl font-bold text-center mb-4">회원가입</h2>
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="사용자 ID"
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="닉네임"
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          type="email"
          placeholder="이메일"
        />
        <button className="w-full p-2 mb-2   border border-black  rounded hover:bg-blue-600">
          이메일 인증
        </button>
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="인증번호"
        />
        <button className="w-full p-2 mb-2 rounded border border-black hover:bg-green-600">
          인증하기
        </button>
        <input
          className="w-full p-2 mb-2 border rounded"
          type="password"
          placeholder="비밀번호"
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          type="password"
          placeholder="비밀번호 확인"
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="빗썸 API 키"
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="빗썸 SEC 키"
        />
        <button className="w-full p-2  border border-black   rounded hover:bg-purple-600">
          회원가입
        </button>
      </div>
    </div>
  );
}
