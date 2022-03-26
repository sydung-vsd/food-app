import PropTypes from 'prop-types';
import { TilteDiv, TitleWrap, TitleFirstSpan, TitleLastSpan, Title } from './style';

export const SectionTitle = ({ children }) => {
  return (
    <TitleWrap>
      <Title>{children}</Title>
      <TilteDiv>
        <TitleFirstSpan />
        <TitleLastSpan />
      </TilteDiv>
    </TitleWrap>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.string,
};
