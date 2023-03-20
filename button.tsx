import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes, forwardRef, PropsWithChildren, useContext } from 'react';
import {
  Transition,
  disabled,
  Elevation,
  focused,
  hovered,
  labelLarge,
  labelMedium,
  labelSmall,
  pressed,
  Spacing,
} from '@millenniumtrust/core';
import { Loader, LoaderStyleVariant } from '../feedback';
import { Icon, IconMapMember, IconSize } from '../icons';
import { DarkModeContextProps, DarkModeContext, ComponentProps } from '../common';

enum ButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

enum ButtonVariant {
  Contained = 'contained',
  Elevated = 'elevated',
  Outlined = 'outlined',
  Text = 'text',
}

enum ButtonRole {
  Button = 'button',
  Link = 'link',
}

type ButtonProps = PropsWithChildren<
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'form' | 'onClick' | 'type'> & {
    size?: ButtonSize;
    leadingIcon?: IconMapMember;
    trailingIcon?: IconMapMember;
    loading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariant;
    role?: ButtonRole;
  }
> &
  ComponentProps;

const largeButton = css<ButtonProps>`
  ${labelLarge};

  height: 4.8rem;
  padding: 0 2.8rem;

  ${({ leadingIcon }) =>
    leadingIcon &&
    css`
      padding: 0 2.8rem 0 ${Spacing.M};
    `}

  ${({ trailingIcon }) =>
    trailingIcon &&
    css`
      padding: 0 ${Spacing.M} 0 2.8rem;
    `}
`;

const mediumButton = css<ButtonProps>`
  ${labelMedium};

  height: 4rem;
  padding: 0 ${Spacing.L};

  ${({ leadingIcon }) =>
    leadingIcon &&
    css`
      padding: 0 ${Spacing.L} 0 ${Spacing.S};
    `}

  ${({ trailingIcon }) =>
    trailingIcon &&
    css`
      padding: 0 ${Spacing.S} 0 ${Spacing.L};
    `}
`;

const smallButton = css<ButtonProps>`
  ${labelSmall};

  height: 3.2rem;
  padding: 0 ${Spacing.S};

  ${({ leadingIcon }) =>
    leadingIcon &&
    css`
      padding: 0 ${Spacing.S} 0 ${Spacing.XS};
    `}

  ${({ trailingIcon }) =>
    trailingIcon &&
    css`
      padding: 0 ${Spacing.XS} 0 ${Spacing.S};
    `}
`;

const containedButton = css<ButtonProps>`
  background-color: ${props => props.theme.colors.primary[400]};
  color: ${props => props.theme.colors.white};

  &:hover {
    ${props => hovered(props.theme.colors.primary[400])};
  }

  &:focus {
    ${props => focused(props.theme.colors.primary[400])};
  }

  &:active {
    ${props => pressed(props.theme.colors.primary[400])};
  }

  &:disabled {
    ${props => !props.loading && disabled(props.theme.colors.primary[400])};
  }
`;

const elevatedButton = css<DarkModeContextProps & ButtonProps>`
  ${Elevation[1]};

  background-color: ${props => (props.darkMode ? props.theme.colors.white : 'transparent')};
  color: ${props => props.theme.colors.primary[500]};

  &:hover {
    ${props => hovered(props.theme.colors.white)};
  }

  &:focus {
    ${props => focused(props.theme.colors.white)};
  }

  &:active {
    ${props => pressed(props.theme.colors.white)};
  }

  &:disabled {
    ${props =>
      props.darkMode
        ? css`
            ${!props.loading && 'opacity: 0.5'}
          `
        : css`
            ${!props.loading && disabled(props.theme.colors.white)};
          `}
  }
`;

const outlinedButton = css<ButtonProps>`
  background-color: transparent;
  border-color: ${props => props.theme.colors.grey[400]};
  color: ${props => props.theme.colors.primary[500]};

  &:hover {
    ${props => hovered(props.theme.colors.white)};
  }

  &:focus {
    ${props => focused(props.theme.colors.white)};
  }

  &:active {
    ${props => pressed(props.theme.colors.white)};
  }

  &:disabled {
    ${props => !props.loading && disabled(props.theme.colors.white, props.theme.colors.states.disabled.overlay.dark)};
  }
`;

const textButton = css<ButtonProps>`
  background-color: transparent;
  color: ${props => props.theme.colors.primary[500]};

  &:hover {
    ${props => hovered(props.theme.colors.white)};
  }

  &:focus {
    ${props => focused(props.theme.colors.white)};
  }

  &:active {
    ${props => pressed(props.theme.colors.white)};
  }

  &:disabled {
    ${props => !props.loading && disabled(props.theme.colors.white)};
  }
`;

const loadingButton = css`
  pointer-events: none;
`;

const Container = styled.button.withConfig({
  shouldForwardProp: (prop, validator) => !['loading'].includes(prop) && validator(prop),
})<DarkModeContextProps & ButtonProps>`
  align-items: center;
  border: 0.1rem solid transparent;
  border-radius: 10rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  transition: background-color ${Transition.Fast};
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  ${({ size }) => size === ButtonSize.Large && largeButton}
  ${({ size }) => size === ButtonSize.Medium && mediumButton}
  ${({ size }) => size === ButtonSize.Small && smallButton}

  ${({ variant }) => variant === ButtonVariant.Contained && containedButton}
  ${({ variant }) => variant === ButtonVariant.Elevated && elevatedButton}
  ${({ variant }) => variant === ButtonVariant.Outlined && outlinedButton}
  ${({ variant }) => variant === ButtonVariant.Text && textButton}

  ${({ loading }) => loading && loadingButton}
`;

const ButtonIconContainerStyles = css<ButtonProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  opacity: ${props => props.loading && 0};
`;

const LeadingIconContainer = styled.span.withConfig({
  shouldForwardProp: (prop, validator) => !['loading'].includes(prop) && validator(prop),
})<ButtonProps>`
  ${ButtonIconContainerStyles}

  margin-right: ${props => (props.size === ButtonSize.Small ? Spacing.XXXS : Spacing.XXS)};
`;

const TrailingIconContainer = styled.span.withConfig({
  shouldForwardProp: (prop, validator) => !['loading'].includes(prop) && validator(prop),
})<ButtonProps>`
  ${ButtonIconContainerStyles}

  margin-left: ${props => (props.size === ButtonSize.Small ? Spacing.XXXS : Spacing.XXS)};
`;

const ButtonContentContainer = styled.div.withConfig({
  shouldForwardProp: (prop, validator) => !['loading'].includes(prop) && validator(prop),
})<ButtonProps>`
  opacity: ${props => props.loading && 0};
`;

const LoaderContainer = styled.div<ButtonProps>`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const getIconSize = (buttonSize: ButtonSize) => {
  if (buttonSize === ButtonSize.Small) {
    return IconSize.XS;
  }
  if (buttonSize === ButtonSize.Large) {
    return IconSize.M;
  }

  return IconSize.S;
};

const getLoaderStyleVariant = (buttonVariant: ButtonVariant) => {
  if (buttonVariant === ButtonVariant.Contained) {
    return LoaderStyleVariant.Secondary;
  }
  if (buttonVariant === ButtonVariant.Elevated) {
    return LoaderStyleVariant.Primary;
  }

  return LoaderStyleVariant.Responsive;
};

const BUTTON_TEST_ID = {
  leadingIcon: 'button/leading-icon',
  trailingIcon: 'button/trailing-icon',
  content: 'button/content',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      leadingIcon,
      loading,
      size = ButtonSize.Medium,
      trailingIcon,
      type = 'button',
      variant = ButtonVariant.Contained,
      role = ButtonRole.Button,
      tags,
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const { darkMode } = useContext(DarkModeContext);
    return (
      <Container
        {...rest}
        disabled={rest.disabled || loading}
        leadingIcon={leadingIcon}
        loading={loading}
        ref={ref}
        size={size}
        trailingIcon={trailingIcon}
        type={type}
        variant={variant}
        darkMode={darkMode}
        role={role}
        data-tags={tags}
      >
        {leadingIcon && (
          <LeadingIconContainer size={size} loading={loading} data-testid={BUTTON_TEST_ID.leadingIcon}>
            <Icon name={leadingIcon} size={getIconSize(size)} />
          </LeadingIconContainer>
        )}
        <ButtonContentContainer loading={loading} data-testid={BUTTON_TEST_ID.content}>
          {children}
        </ButtonContentContainer>
        {loading && (
          <LoaderContainer>
            <Loader variant={getLoaderStyleVariant(variant)} size={getIconSize(size)} />
          </LoaderContainer>
        )}
        {trailingIcon && (
          <TrailingIconContainer size={size} loading={loading} data-testid={BUTTON_TEST_ID.trailingIcon}>
            <Icon name={trailingIcon} size={getIconSize(size)} />
          </TrailingIconContainer>
        )}
      </Container>
    );
  },
);

export { Button, ButtonSize, ButtonVariant, ButtonRole, BUTTON_TEST_ID };
export type { ButtonProps };
