import styled, { css } from 'styled-components';

enum ButtonSize {
  Small,
  Medium,
  Large,
}

enum ButtonStyle {
  Primary,
  Secondary,
  Outlined,
  Text,
}

type ButtonProps = {
  text?: string;
  size?: ButtonSize;
  styles?: ButtonStyle;
  disabled?: boolean;
  onClick?: () => void;
};

const smallStyles = css`
  padding: 3px 10px;
`;

const largeStyles = css`
  padding: 8px 25px;
`;

const primaryStyles = css`
  :active,
  :focus {
    background: #5a9d33;
  }
`;

const secondaryStyles = css`
  color: #276a00;
  background: #fff;
  box-shadow: 0px 1px 2px rgba(61, 61, 58, 0.3),
    0px 1px 3px 1px rgba(61, 61, 58, 0.1);
  :hover {
    background: rgba(49, 133, 0, 0.12);
  }
  :active,
  :focus {
    background: rgba(49, 133, 0, 0.2);
  }
  :disabled {
    pointer-events: none;
  }
`;

const outlinedStyles = css`
  color: #276a00;
  background: #fbfbfb;
  :hover {
    background: rgba(49, 133, 0, 0.12);
  }
  :active,
  :focus {
    background: rgba(49, 133, 0, 0.2);
  }
  :disabled {
    background: #fff;
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Container = styled.button<ButtonProps>`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
  background: rgba(24, 24, 23, 0.1);
  color: #181817;
  opacity: 0.5;
  :disabled {
    background: #318500;
    border-radius: 100px;
    border: 0;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.25px;
    line-height: 24px;
    padding: 8px 15px;
  }

  ${({ size }) => size === ButtonSize.Small && smallStyles}
  ${({ size }) => size === ButtonSize.Large && largeStyles} 
  ${({ styles }) => styles === ButtonStyle.Primary && primaryStyles}
  ${({ styles }) => styles === ButtonStyle.Secondary && secondaryStyles}
  ${({ styles }) => styles === ButtonStyle.Outlined && outlinedStyles}
`;

const MyButton = ({
  size = ButtonSize.Medium,
  styles = ButtonStyle.Secondary,
  text = 'Button',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Container
      type='button'
      disabled={disabled}
      styles={styles}
      size={size}
      onClick={onClick}
      {...props}
    >
      {text}
    </Container>
  );
};

export { MyButton, ButtonSize, ButtonStyle };
export type { ButtonProps };
