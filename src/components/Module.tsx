import {ComponentType, FC, useEffect, useState} from 'react';
import {ListChildComponentProps, VariableSizeList} from 'react-window';
import {DUMMY_DATA} from '../constants/varibales';
import {useNavigate} from 'react-router-dom';

const Module: FC = () => {
	const navigate = useNavigate();
	const [height, setHeight] = useState(500);
	const [scroll, setScroll] = useState<number>(0);

	// 브라우저의 높이에 맞게 컨테이너 height를 설정
	useEffect(() => {
		if (window !== null) {
			setHeight(window.innerHeight);
		}
	}, []);

	// 스크롤 값 저장
	useEffect(() => sessionStorage.setItem('scroll', String(scroll)), [scroll]);

	const DataCard: ComponentType<ListChildComponentProps<IData>> = ({
		index,
		style,
	}) => {
		const {img, title, id} = DUMMY_DATA[index];

		return (
			<div
				key={index}
				style={style}
				onClick={() => navigate(`/data/${id + 1}`)}
			>
				<p>{title}</p>
				<img src={img} alt={`${title}이미지`} />
			</div>
		);
	};

	// react-virtualized CellMeasure과 동일한 기능.
	const getItemSize = (index: number) => {
		const title = DUMMY_DATA[index].title;
		const totalCount = title.length;
		const itemHeight = 20;
		const padding = 10;

		// 위의 로직과 관계없이 결론적으로 아이템 index에 직접 접근하여 컨텐츠 크기를 할당하기 위함
		return totalCount * itemHeight + padding * 2;
	};

	return (
		// FixedSizeList의 대체. react-virtualized의 AutoSizer
		<VariableSizeList
			height={height}
			itemCount={DUMMY_DATA.length}
			itemSize={getItemSize}
			width={500}
			onScroll={({scrollOffset}) => {
				setScroll(scrollOffset);
			}}
			initialScrollOffset={Number(sessionStorage.getItem('scroll')) ?? 0}
		>
			{DataCard}
		</VariableSizeList>
	);
};

export default Module;
