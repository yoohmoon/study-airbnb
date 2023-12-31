import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
  faChevronLeft,
  faChevronRight,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TAB_DATA_LIST } from './data';
import { useRecoilState } from 'recoil';
import filterCategory from '../../store/filterCategory';
import { FormattedMessage } from 'react-intl';

interface TabItemProps {
  slidePx: number;
  isActive?: boolean;
}

interface FilterNavProps {
  scrollY: number;
}

const FilterNav: React.FC<FilterNavProps> = ({ scrollY }) => {
  // carousel logic
  const ITEM_WIDTH = 56; // Width of each item
  const ITEM_GAP = 35; // Gap between items
  const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_GAP; // Total width of each item including gap
  const ITEMS_PER_MOVE = 5; // Number of items to move per click
  const MOVE_DISTANCE = ITEM_TOTAL_WIDTH * ITEMS_PER_MOVE;
  const TOTAL_ITEMS = TAB_DATA_LIST.length; // Total number of items
  const VISIBLE_ITEMS = 24; // Replace with actual visible items count
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

  // 밑줄 indicator + tab func with filter
  // const [clickedFilterIndex, setClickedFilterIndex] = useState(0);
  const [clickedFilterIndex, setClickedFilterIndex] =
    useRecoilState(filterCategory);

  const handleCategoryClick = (id: number) => {
    setClickedFilterIndex(id);
    console.log('filter nav id? ', clickedFilterIndex);
  };

  return (
    <Container scrollY={scrollY}>
      <FilterNavContainer>
        <PrevArrowBtn onClick={handlePrevBtn} slidePx={slidePx}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </PrevArrowBtn>
        <TabList>
          {TAB_DATA_LIST.map((item) => (
            <ItemBox>
              <TabItem
                key={item.id}
                slidePx={slidePx}
                onClick={() => handleCategoryClick(item.id)}
                isActive={item.id === clickedFilterIndex}
              >
                <TabImg src={item.src} alt={item.title} />
                <TabTitle>
                  <FormattedMessage id={item.title} />
                </TabTitle>
              </TabItem>
            </ItemBox>
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
          <StyledFilterIcon icon={faFilter} size='xs' />
          <span>
            <FormattedMessage id='filter' />
          </span>
        </FilterBtnWrapper>
      </FilterNavContainer>
    </Container>
  );
};

const Container = styled.div<{ scrollY: number }>`
  padding-top: ${(props) => (props.scrollY > 28 ? '0px' : '20px')};
  transition: padding-top 0.05s ease-in-out;
`;

const FilterNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 80px;
  padding: 0 80px;
`;

const TabList = styled.ul`
  /* flex-grow: 2; */
  flex-basis: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 50px;
  overflow: hidden;
`;

const ItemBox = styled.div`
  position: relative;
  height: 80px;
`;

// 한개 width 약 56px + gap 35px => 91px
// 5개 이동시, 455px => 420px

// 캐러셀 하나의 아이템
const TabItem = styled.li<TabItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 56px; */
  gap: 9px;
  height: 100%;
  padding: 4px 0;
  color: ${({ theme }) => theme.color.darkGray};

  /* transform: translateX(-420px); */
  transform: translateX(${(props) => props.slidePx}px);
  transition: transform 0.8s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.color.mainBlack};
    cursor: pointer;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.color.borderGray};
      position: absolute;
      bottom: 0px;
    }
  }

  /* &:active {
    transition: transform 0.01s ease-out;
    transform: scale(0.93);
  } */

  &::after {
    content: '';
    display: ${(props) => (props.isActive ? 'block' : 'none')};
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.color.mainBlack};
    position: absolute;
    bottom: 0px;
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
  /* flex-grow: 0.5; */
  display: ${(props) => (props.slidePx === 0 ? 'none' : 'inline-block')};
  /* display: ${(props) => props.slidePx}===0 ? 'none' : ''; */
  width: 30px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 50%;
`;
const NextArrowBtn = styled.button<{ slidePx: number; maxTranslateX: number }>`
  display: ${(props) =>
    props.slidePx === props.maxTranslateX ? 'none' : 'inline-block'};
  /* display: ${(props) => props.slidePx}===0 ? 'none' : ''; */
  width: 30px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 50%;
`;

const FilterBtnWrapper = styled.div`
  /* flex-grow: 1; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 45px;
  padding: 4px 17px;
  border: 1px solid ${({ theme }) => theme.color.borderGray};
  border-radius: 10px;
  font-size: 14px;

  span {
    margin-left: 3px;
  }
`;

const StyledFilterIcon = styled(FontAwesomeIcon)`
  margin-right: 3px;
`;

export default FilterNav;
