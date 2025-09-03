'use client';

import { useMemo, useState } from 'react';
import Checkbox from '@/components/checkbox';

export default function TermsStep({ onNext }: { onNext: () => void }) {
    // 실제 체크 상태
    const [allChecked, setAllChecked] = useState(false);
    const [agreeService, setAgreeService] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    // indeterminate(회색 표시) 초기값: true → 실제 미체크지만 UI는 체크처럼 보임
    const [allInd, setAllInd] = useState(true);
    const [serviceInd, setServiceInd] = useState(true);
    const [privacyInd, setPrivacyInd] = useState(true);

    const canProceed = useMemo(() => agreeService && agreePrivacy, [agreeService, agreePrivacy]);

    const toggleAll = (v: boolean) => {
        setAllChecked(v);
        setAgreeService(v);
        setAgreePrivacy(v);
        setAllInd(false);
        setServiceInd(false);
        setPrivacyInd(false);
    };

    // 하위 체크 변경 시 전체 동의 동기화
    const handleService = (v: boolean) => {
        setAgreeService(v);
        setServiceInd(false); // 사용자가 상호작용하면 indeterminate 해제
        const nextAll = v && (agreePrivacy || false);
        setAllChecked(nextAll);
        setAllInd(false);
    };

    const handlePrivacy = (v: boolean) => {
        setAgreePrivacy(v);
        setPrivacyInd(false); // 사용자가 상호작용하면 indeterminate 해제
        const nextAll = v && (agreeService || false);
        setAllChecked(nextAll);
        setAllInd(false);
    };

    return (
        <section className="flex flex-col justify-center mt-[160px] mb-[155px]">
            <div className="text-center space-y-2">
                <h2 className="text-[28px] font-bold">Pickle 이용 약관에 동의해 주세요.</h2>
                <p className="text-[15px]">Please agree to the Pickle Terms of Service.</p>
            </div>

            <div className="space-y-4 mt-[61px]">
                <Checkbox
                    checked={allChecked}
                    indeterminate={allInd && !allChecked}
                    onChange={toggleAll}
                    aria-label="전체 동의하기"
                    label={<span className="font-semibold text-[16px]">전체 동의하기</span>}
                />

                <div className="mt-[41px] space-y-3">
                    <div className="flex items-start justify-between gap-3">
                        <Checkbox
                            checked={agreeService}
                            indeterminate={serviceInd && !agreeService}
                            onChange={handleService}
                            aria-label="(필수) 서비스 이용약관 동의"
                            label={<span className="text-[15px]">[필수] 서비스 이용약관 동의</span>}
                        />
                        <a href="/terms" className="text-sm underline text-gray-500">
                            자세히
                        </a>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                        <Checkbox
                            checked={agreePrivacy}
                            indeterminate={privacyInd && !agreePrivacy}
                            onChange={handlePrivacy}
                            aria-label="(필수) 개인정보 수집 및 이용 동의"
                            label={<span className="text-[15px]">[필수] 개인정보 수집 및 이용 동의</span>}
                        />
                        <a href="/privacy" className="text-sm underline text-gray-500">
                            자세히
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-[30px]">
                <p className="text-xs text-gray-500 leading-relaxed">
                    정보주체의 개인정보 및 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여
                    안전하게 관리하고 있습니다. 자세한 사항은{' '}
                    <a href="/privacy" className="underline">
                        개인정보처리방침
                    </a>
                    에서 확인할 수 있습니다.
                </p>
            </div>

            <div className="flex flex-col gap-3 mt-6 gap-y-6">
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!canProceed}
                    className={`h-12 rounded-full text-white transition ${
                        canProceed ? 'bg-black hover:opacity-90' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                    다음
                </button>
                <button type="button" className="text-[15px] underline text-[#008547]" onClick={() => history.back()}>
                    Back
                </button>
            </div>
        </section>
    );
}
