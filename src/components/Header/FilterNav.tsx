import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
  faChevronLeft,
  faChevronRight,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TAB_DATA_LIST } from './data';

interface TabItemProps {
  slidePx: number;
}

const FilterNav = () => {
  /*   const ITEM_WIDTH = 56; // Width of each item
  const ITEM_GAP = 35; // Gap between items
  const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_GAP; // Total width of each item including gap
  const ITEMS_PER_MOVE = 5; // Number of items to move per click
  const MOVE_DISTANCE = ITEM_TOTAL_WIDTH * ITEMS_PER_MOVE;
  const TOTAL_ITEMS = TAB_DATA_LIST.length; // Total number of items
  // const MAX_TRANSLATE_X = ITEM_TOTAL_WIDTH * TOTAL_ITEMS - MOVE_DISTANCE;
  const MAX_TRANSLATE_X = ITEM_TOTAL_WIDTH * TOTAL_ITEMS; */

  const ITEM_WIDTH = 56; // Width of each item
  const ITEM_GAP = 35; // Gap between items
  const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_GAP; // Total width of each item including gap
  const ITEMS_PER_MOVE = 5; // Number of items to move per click
  const MOVE_DISTANCE = ITEM_TOTAL_WIDTH * ITEMS_PER_MOVE;
  const TOTAL_ITEMS = TAB_DATA_LIST.length; // Total number of items
  const VISIBLE_ITEMS = 24; // Replace with your actual visible items count
  const MAX_TRANSLATE_X =
    ITEM_TOTAL_WIDTH * TOTAL_ITEMS - ITEM_TOTAL_WIDTH * VISIBLE_ITEMS;

  const [slidePx, setSlidePx] = useState(0);

  const handlePrevBtn = () => {
    if (slidePx < 0) setSlidePx(Math.min(slidePx + MOVE_DISTANCE, 0));
  };

  const handleNextBtn = () => {
    if (slidePx > -MAX_TRANSLATE_X)
      setSlidePx(Math.max(slidePx - MOVE_DISTANCE, -MAX_TRANSLATE_X));
  };

  // tab func with filter
  const [clickedFilterIndex, setClickedFilterIndex] = useState(0);

  return (
    <FilterNavContainer>
      <PrevArrowBtn onClick={handlePrevBtn} slidePx={slidePx}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </PrevArrowBtn>
      <TabList>
        {TAB_DATA_LIST.map((item) => (
          // <ItemWrapper>
          <TabItem key={item.id} slidePx={slidePx}>
            <TabImg src={item.src} alt={item.title} />
            <TabTitle>{item.title}</TabTitle>
          </TabItem>
          // </ItemWrapper>
        ))}
      </TabList>
      <NextArrowBtn
        onClick={handleNextBtn}
        slidePx={slidePx}
        maxTranslateX={-MAX_TRANSLATE_X}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </NextArrowBtn>
      <FilterBtnWrapper>
        <FontAwesomeIcon icon={faFilter} />
        <span>필터</span>
      </FilterBtnWrapper>
    </FilterNavContainer>
  );
};

const FilterNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 80px;
`;

const TabList = styled.ul`
  flex-grow: 0.7;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 35px;
  background-color: #ddd;

  overflow: hidden;
`;

const ItemWrapper = styled.div``;

// 한개 width 약 56px + gap 35px => 91px
// 5개 이동시, 455px => 420px

// 캐러셀 하나의 아이템
const TabItem = styled.li<TabItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 56px;
  gap: 9px;
  height: 100%;
  padding: 4px 0;
  color: ${(props) => props.theme.darkGray};

  /* transform: translateX(-420px); */
  transform: translateX(${(props) => props.slidePx}px);
  transition: translateX ease-in-out 0.6s;

  &:hover {
    background-color: aliceblue;
    color: ${(props) => props.theme.mainBlack};
  }
`;

const TabImg = styled.img`
  width: 24px;
  height: 24px;
`;

const TabTitle = styled.div`
  width: 100%;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
`;

const PrevArrowBtn = styled.button<TabItemProps>`
  display: ${(props) => (props.slidePx === 0 ? 'none' : 'inline-block')};
  /* display: ${(props) => props.slidePx}===0 ? 'none' : ''; */
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.borderGray};
  border-radius: 50%;
`;
const NextArrowBtn = styled.button<{ slidePx: number; maxTranslateX: number }>`
  display: ${(props) =>
    props.slidePx === props.maxTranslateX ? 'none' : 'inline-block'};
  /* display: ${(props) => props.slidePx}===0 ? 'none' : ''; */
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.borderGray};
  border-radius: 50%;
`;

const FilterBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 45px;
  padding: 0 12px;
  border: 1px solid ${(props) => props.theme.borderGray};
  border-radius: 10px;
`;

export default FilterNav;