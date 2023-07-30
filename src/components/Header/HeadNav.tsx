import React from 'react';
import { styled } from 'styled-components';
import Logo from './Logo';
import Lang from './Lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const HeadNav = () => {
  return (
    <HeaderContainer>
      <LogoBox>
        <Logo />
      </LogoBox>
      <SearchBar>
        <DestBtn>어디든지</DestBtn>
        <Separator></Separator>
        <DateBtn>어디든 일주일</DateBtn>
        <Separator></Separator>
        <GuestBtn>
          <IconWrapper>
            <span>게스트 추가</span>
            <GlassBox>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className='magnifying'
              />
            </GlassBox>
          </IconWrapper>
        </GuestBtn>
      </SearchBar>
      <NavLinks>
        <ul>
          <HostBox>당신의 공간을 에어비앤비하세요</HostBox>
          <LangBox>
            <Lang />
          </LangBox>
          <UserNav>
            <FontAwesomeIcon icon={faBars} size='lg' className='barsIcon' />
            <FontAwesomeIcon
              icon={faCircleUser}
              size='2xl'
              className='userIcon'
            />
          </UserNav>
        </ul>
      </NavLinks>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 80px;
  border-bottom: 1px solid ${(props) => props.theme.spLightGray};
`;

const LogoBox = styled.div`
  flex-grow: 1;
  flex-basis: 140px;
`;

const SearchBar = styled.div`
  /* margin: 0 auto; */
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.borderGray};
  border-radius: 50px;
`;

const NavLinks = styled.nav`
  flex-grow: 1;
  flex-basis: 140px;
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const DestBtn = styled.button`
  flex-grow: 1;
`;
const DateBtn = styled.button`
  flex-grow: 1;
`;
const GuestBtn = styled.button`
  flex-grow: 2.6;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GlassBox = styled.div`
  width: 32px;
  height: 32px;
  line-height: 32px;
  /* text-align: center; */
  border-radius: 50%;
  background-color: ${(props) => props.theme.brandPink};

  .magnifying {
    color: #fff;
    text-align: center;
  }
`;

const Separator = styled.span`
  width: 1px;
  height: 25px;
  border: 0.05px solid ${(props) => props.theme.borderGray};
  background-color: ${(props) => props.theme.borderGray};
`;

const HostBox = styled.li`
  height: 45px;
  line-height: 24px;
  padding: 12px;
  border-radius: 80px;
  font-size: 14px;
  font-weight: 700;

  &:hover {
    background-color: ${(props) => props.theme.bgLightGray};
  }
`;
const LangBox = styled.li`
  height: 45px;
  line-height: 25px;
  border-radius: 50%;
  padding: 12px;
  margin-right: 8px;

  &:hover {
    background-color: ${(props) => props.theme.bgLightGray};
  }
`;

const UserNav = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 45px;
  padding: 5px 5px 5px 12px;
  border: 1px solid ${(props) => props.theme.borderGray};
  border-radius: 80px;

  .barsIcon {
    color: ${(props) => props.theme.mainBlack};
  }

  .userIcon {
    color: ${(props) => props.theme.darkGray};
  }
`;

export default HeadNav;
