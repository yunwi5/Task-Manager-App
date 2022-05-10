import React from 'react';

import { AbstractAnalyzer } from '../../../models/analyzer-models/AbstractAnalyzer';
import { AnalysisOption, ChartData } from '../../../models/analyzer-models/helper-models';
import { getCategoryBorderColor } from '../../../utilities/gen-utils/color-util';
import AnalysisMessage from '../analysis-message/AnalysisMessage';
import { FlexChart } from '../charts';
import AnalysisSectionWrapper from './AnalysisSectionWrapper';

interface Props {
    analyzer: AbstractAnalyzer;
}

const CategoryAnalysis: React.FC<Props> = ({ analyzer }) => {
    const currentChartDataArray: ChartData[] = analyzer.generateCategoryData();
    const previousChartDataArray: ChartData[] = analyzer.generateCategoryData(
        AnalysisOption.PREVIOUS,
    );

    return (
        <AnalysisSectionWrapper title="Category Analysis">
            <FlexChart
                chartTitle={'category distribution'}
                chartLabel={'Task category'}
                chartDataArray={currentChartDataArray}
            />
            <AnalysisMessage
                currentChartDataArray={currentChartDataArray}
                previousChartDataArray={previousChartDataArray}
                labelColorCallback={getCategoryBorderColor}
            />
        </AnalysisSectionWrapper>
    );
};

export default CategoryAnalysis;