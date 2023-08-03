import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface OptionCardProps {
  option: number;
  selectedOption: number;
}

export const Container = styled.div`
  width: 100%;
  height: 197px;
  margin-top: 24px;
  gap: 6px;

  display: flex;
`;

export const OptionCard = styled.div<OptionCardProps>`
  ${({ theme, option, selectedOption }) => {
    const { colors } = theme;

    return css`
      width: 160px;
      height: 197px;

      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;

      border-radius: 8px;
      border: ${option === selectedOption && `2px solid ${colors.hyundaiPrimaryBlue}`};
      background-color: ${option === selectedOption ? 'rgba(0, 44, 95, 0.1)' : colors.hyundaiLightSand};
    `;
  }}
`;

export const Image = styled.img`
  width: 160px;
  height: 93px;
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  height: 104px;
  padding: 10px 9px 8px 9px;

  position: relative;
`;

export const Text = styled.p<OptionCardProps>`
  ${({ theme, option, selectedOption }) => {
    const { colors, fonts } = theme;

    return css`
      color: ${option === selectedOption ? colors.hyundaiPrimaryBlue : colors.black};
      ${fonts.bodyMedium3}
    `;
  }}
`;

export const ButtonBox = styled.div`
  margin-top: 12px;

  display: flex;
  justify-content: center;
`;

export const Button = styled.button<OptionCardProps>`
  ${({ theme, option, selectedOption }) => {
    const { colors, fonts } = theme;

    return css`
      width: 142px;
      height: 30px;
      gap: 4px;
      z-index: 1;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${option === selectedOption ? colors.hyundaiNeutral : '#385da2'};
      ${fonts.bodyMedium3};

      border-radius: 8px;
      border: 1px solid #385da2;

      background-color: ${option === selectedOption ? '#385da2' : colors.hyundaiNeutral};
    `;
  }}
`;

export const Icon = styled.img`
  bottom: 15.5px;
  right: 24px;
  z-index: 1;

  position: absolute;
`;

export const OptionCardHover = styled.div`
  width: 160px;
  height: 197px;

  position: absolute;
  top: 0;
  left: 0;

  border-radius: 8px;
  border: 0;
  background: rgba(35, 35, 35, 0.75);
`;

export const DescriptionHoverWrapper = styled.ul`
  padding: 21px 15px 0 30px;

  list-style-type: disc;
  list-style-position: outside;
`;

export const DescriptionHover = styled.li`
  ${({ theme }) => {
    const { fonts } = theme;

    return css`
      color: #fff;
      ${fonts.bodyRegular4}
    `;
  }}
`;
