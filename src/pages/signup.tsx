export default function SignUp() {
  const labelClass = "mb-1 text-sm font-medium";
  const inputClass =
    "w-[250px] h-[38px] px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring focus:border-white-500";
  const blueButton =
    "px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pb-20">
      <div className="w-full max-w-lg p-8">
        <h1 className="text-5xl font-extrabold text-left mb-5">로그인</h1>
        <p className="text-sm text-left mb-20">
          다시 오신 걸 환영합니다! <br />
          아이디와 비밀번호를 입력해주세요.
        </p>

        <form className="flex flex-col space-y-4">
          {/* 아이디 */}
          <div className="flex flex-col text-left">
            <label className={labelClass}>아이디</label>
            <input type="text" className={inputClass} />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col text-left">
            <label className={labelClass}>비밀번호</label>
            <input type="password" className={inputClass} />
          </div>

          {/* 버튼들 */}
          <div className="w-[250px] flex space-x-2 pt-16">
            <button
              type="button"
              className="basis-[30%] h-[38px] bg-white text-gray-800 rounded-md border border-[#d8d8d8] hover:bg-gray-100"
            >
              회원가입
            </button>
            <button type="submit" className={`${blueButton} basis-[70%]`}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
