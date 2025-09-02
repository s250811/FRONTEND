export default function Navigation() {
  return (
    /**
     * - 프로필
     */
    <aside className="h-screen border-r border-gray-200 p-4 space-y-3 bg-white flex flex-col">
      <div className="flex items-center gap-2 text-gray-800 font-semibold">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-gray-100">Ⅱ</span>
        프로젝트 명
      </div>
      {/** 메뉴 */}
      <nav className="text-sm text-gray-700 space-y-1 pt-2 flex-1 overflow-y-auto">
        <a className="block px-2 py-1 rounded hover:bg-gray-50">알림함</a>
        <div>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50">내 프로젝트</button>
        </div>
        <div>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50">체험기반 플러그</button>
        </div>
        <div>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50">계획 관리</button>
        </div>
        <div>
          <div className="px-2 py-1 font-medium text-gray-900">상세이미지 개선</div>
          <div className="pl-3 space-y-1">
            <a className="block px-2 py-1 rounded hover:bg-gray-50">하위 프로젝트 1</a>
            <a className="block px-2 py-1 rounded bg-gray-100">하위 프로젝트 2</a>
            <a className="block px-2 py-1 rounded hover:bg-gray-50">업무 1</a>
            <a className="block px-2 py-1 rounded hover:bg-gray-50">하위 프로젝트 3</a>
            <a className="block px-2 py-1 rounded hover:bg-gray-50">하위 프로젝트 4</a>
            <a className="block px-2 py-1 rounded hover:bg-gray-50">하위 프로젝트 5</a>
            <a className="block px-2 py-1 rounded hover:bg-gray-50">하위 프로젝트 6</a>
          </div>
        </div>
        <div className="pt-2">
          <a className="block px-2 py-1 rounded hover:bg-gray-50">휴지통</a>
        </div>
        <div className="pt-4 text-xs text-gray-500">
          <div className="px-2 py-1">워크스페이스 초대</div>
          <div className="px-2 py-1">워크스페이스 생성</div>
        </div>
      </nav>
    </aside>
  )
}
