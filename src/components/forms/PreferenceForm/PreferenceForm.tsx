import React from 'react';

import {FormStep1} from "./FormStep1";
import {FormStep2} from "./FormStep2";
import {FormStep3} from "./FormStep3";

import {Form} from "../Form/Form";
import {Methods} from "../../../constants";

const stepTitles = ['Альтернативы и эксперты', 'Матрица предпочтений', 'Результаты'];

export const PreferenceForm: React.FC = () => {
    const [step, setStep] = React.useState<number>(1);
    const [alternatives, setAlternatives] = React.useState<string[]>([]);
    const [experts, setExperts] = React.useState<string[]>([]);
    const [matrixData, setMatrixData] = React.useState<number[][]>([]);

    const onStep1Submit = React.useCallback((alternatives: string[], experts: string[]) => {
        setAlternatives(alternatives);
        setExperts(experts);

        setStep(step + 1);
    }, [step]);

    const onStep2Submit = React.useCallback((matrixData: number[][]) => {
        setMatrixData(matrixData);

        setStep(step + 1);
    }, [step]);

    const getStepContent = React.useCallback(() => {
        switch (step) {
            case 1:
                return <FormStep1 onSubmit={onStep1Submit} />;
            case 2:
                return <FormStep2 alternatives={alternatives} experts={experts} onSubmit={onStep2Submit}/>;
            case 3:
                return <FormStep3 alternatives={alternatives} experts={experts} matrixData={matrixData} />;
            default:
                return <div>'Unknown step'</div>;
        }
    }, [alternatives, matrixData, experts, onStep1Submit, onStep2Submit, step]);

    return (
        <Form method={Methods.Preference} getFormStepContent={getStepContent} step={step} stepTitles={stepTitles} />
    );
};
