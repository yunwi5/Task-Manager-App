import { useMemo, useState } from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, ChartData } from '../../../models/analyzer-models/helper-models';
import { Theme } from '../../../models/design-models';
import { Category } from '../../../models/task-models/Category';
import { getCategoryBorderColor } from '../../../utilities/gen-utils/color-util';
import Button from '../../ui/buttons/Button';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import { FlexChart } from '../charts';
import ComparisonChart from '../charts/ComparisonChart';
import { ChartSectionContainer, FlexChartContainer } from '../containers';
import SubCategoryAnalysis from './SubCategoryAnalysis';

interface Props {
    analyzer: AbstractAnalyzer;
    timeFrame: string;
}

const CategoryAnalysis: React.FC<Props> = ({ analyzer, timeFrame }) => {
    const [showComparison, setShowComparison] = useState(false);
    const [showSubCategory, setShowSubCategory] = useState(false);

    const currentChartDataArray: ChartData[] = useMemo(
        () => analyzer.generateCategoryData(),
        [analyzer],
    );
    const previousChartDataArray: ChartData[] = useMemo(
        () => analyzer.generateCategoryData(AnalysisOption.PREVIOUS),
        [analyzer],
    );

    return (
        <>
            <ChartSectionContainer showComparison={showComparison}>
                <FlexChartContainer>
                    <FlexChart
                        chartTitle={'category distribution'}
                        chartLabel={'Task category'}
                        chartDataArray={currentChartDataArray}
                    />
                </FlexChartContainer>
                {showComparison && (
                    <ComparisonChart
                        chartTitle={'Category comparison'}
                        firstDataSet={{ label: `This ${timeFrame}`, data: currentChartDataArray }}
                        secondDataSet={{ label: `Last ${timeFrame}`, data: previousChartDataArray }}
                    />
                )}
                <AnalysisMessage
                    currentChartDataArray={currentChartDataArray}
                    previousChartDataArray={previousChartDataArray}
                    labelColorCallback={getCategoryBorderColor}
                    preposition={'about'}
                    showComparison={showComparison}
                    onShowComparison={() => setShowComparison((ps) => !ps)}
                    additionalButton={
                        <Button
                            className={`!bg-transparent !border-blue-400 !text-blue-600`}
                            theme={Theme.TERTIARY}
                            onClick={() => setShowSubCategory((ps) => !ps)}
                        >
                            {showSubCategory ? 'Hide Subcategory' : 'Show Subcategory'}
                        </Button>
                    }
                />
            </ChartSectionContainer>
            {showSubCategory && <SubCategoryAnalysis analyzer={analyzer} timeFrame={timeFrame} />}
        </>
    );
};

export default CategoryAnalysis;
