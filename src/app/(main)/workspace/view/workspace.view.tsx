export default function Vworkspace() {
  return (
    <main className="flex-1 p-6 bg-white">
    {/* 헤더 */}
    <header className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">상위 프로젝트 이름</h1>
          <span className="pill text-xs px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200">● Active</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <div className="flex -space-x-2">
            <img className="avatar ring-2 ring-white" src="https://i.pravatar.cc/32?img=12" alt=""/>
            <img className="avatar ring-2 ring-white" src="https://i.pravatar.cc/32?img=7" alt=""/>
            <img className="avatar ring-2 ring-white" src="https://i.pravatar.cc/32?img=3" alt=""/>
            <img className="avatar ring-2 ring-white" src="https://i.pravatar.cc/32?img=14" alt=""/>
          </div>
          <span>Alice, Bob, Charlie +12 others</span>
        </div>
      </div>
      <button className="px-4 py-2 pill bg-gray-900 text-white text-sm">WBS</button>
    </header>

    {/* 타임라인 카드 */}
    <section className="mt-8 p-4 rounded-xl bg-white border border-gray-200 card">
      {/* 월 */}
      <div className="text-gray-700 font-medium">4월</div>

      {/* 날짜 그리드 헤더 */}
      <div className="wbs-grid mt-2 text-center text-gray-500 text-sm select-none">
        <div className="py-2 wbs-col">1</div>
        <div className="py-2 wbs-col">2</div>
        <div className="py-2 wbs-col">3</div>
        <div className="py-2 wbs-col">4</div>
        <div className="py-2 wbs-col">5</div>
        <div className="py-2 wbs-col">6</div>
        <div className="py-2 wbs-col">7</div>
        <div className="py-2 wbs-col font-semibold text-black bg-gray-100 rounded">8</div>
        <div className="py-2 wbs-col">9</div>
        <div className="py-2 wbs-col">10</div>
        <div className="py-2 wbs-col">11</div>
        <div className="py-2 wbs-col">12</div>
        <div className="py-2 wbs-col">13</div>
        <div className="py-2">14</div>
      </div>

      {/* 타임라인 캔버스 */}
      <div className="relative mt-2 border-t border-gray-200" style={{height: '360px'}}>
        {/* 오늘(8일) 세로선: 7칸 완료 후 중앙 배치 (7/14 ~= 50%) */}
        <div className="today-line" style={{left: 'calc((7 / 14) * 100%)'}}></div>

        {/* 섹션 라벨들 (좌측) */}
        <div className="absolute left-0 top-2 task-meta">하위 프로젝트 1</div>
        <div className="absolute left-0 top-72 task-meta">하위 프로젝트 6</div>

        {/* 실제 바는 전체 캔버스 기준 %로 위치 고정 (left: (start-1)/14, width: length/14) */}
        {/* Row 1: Alexis Tran (1~3) */}
        <div className="task-bar bg-gray-100 text-gray-700" style={{left: 'calc((0/14)*100%)', width: 'calc((3/14)*100%)', top: '24px'}}>
          <img className="avatar" src="https://i.pravatar.cc/40?img=21" alt="" />
          <span className="text-sm">Alexis Tran</span>
          <span className="task-percent">100%</span>
        </div>

        {/* Row 2: Derek Yu (2~4) */}
        <div className="task-bar bg-emerald-100 text-emerald-900" style={{left: 'calc((1/14)*100%)', width: 'calc((3/14)*100%)', top: '84px'}}>
          <img className="avatar" src="https://i.pravatar.cc/40?img=47" alt="" />
          <span className="text-sm">Derek Yu</span>
          <span className="task-percent">50%</span>
        </div>

        {/* Row 3: Alice (3~7) 강조 */}
        <div className="task-bar bg-emerald-200 text-emerald-900" style={{left: 'calc((2/14)*100%)', width: 'calc((5/14)*100%)', top: '136px'}}>
          <img className="avatar" src="https://i.pravatar.cc/40?img=5" alt="" />
          <span className="text-sm font-medium">Alice</span>
          <span className="task-percent">20%</span>
        </div>

        {/* Row 4: Alexis Tran (4~6) */}
        <div className="task-bar bg-gray-100 text-gray-700" style={{left: 'calc((3/14)*100%)', width: 'calc((3/14)*100%)', top: '188px'}}>
          <img className="avatar" src="https://i.pravatar.cc/40?img=21" alt="" />
          <span className="text-sm">Alexis Tran</span>
          <span className="task-percent">50%</span>
        </div>

        {/* Row 5: Alexis Tran (6~8) */}
        <div className="task-bar bg-gray-100 text-gray-700" style={{left: 'calc((5/14)*100%)', width: 'calc((3/14)*100%)', top: '240px'}}>
          <img className="avatar" src="https://i.pravatar.cc/40?img=21" alt="" />
          <span className="text-sm">Alexis Tran</span>
          <span className="task-percent">20%</span>
        </div>

        {/* Row 6: Alice (6~9) */}
        <div className="task-bar bg-gray-100 text-gray-700" style={{left: 'calc((5/14)*100%)', width: 'calc((4/14)*100%)', top: '292px'}}>
          <img className="avatar" src="https://i.pravatar.cc/40?img=5" alt="" />
          <span className="text-sm">Alice</span>
          <span className="task-percent">10%</span>
        </div>

        {/* Row 7: Derek Yu (9~12) */}
        <div className="task-bar bg-gray-100 text-gray-700" style={{left: 'calc((8/14)*100%)', width: 'calc((4/14)*100%)', top: '344px'}}>
          <img className="avatar" src="https://i.pravatar.cc/40?img=47" alt="" />
          <span className="text-sm">Derek Yu</span>
          <span className="task-percent">10%</span>
        </div>
      </div>

      {/* 하위 프로젝트 2 라벨 */}
      <div className="mt-3 text-sm font-medium text-emerald-600 flex items-center gap-2">
        <span>▾</span> 하위 프로젝트 2
      </div>
    </section>
  </main>
  )
}