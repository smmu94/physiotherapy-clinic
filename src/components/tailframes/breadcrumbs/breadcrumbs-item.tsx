import { type ReactNode } from 'react';
import { clsxMerge } from '../utils';

export interface BreadcrumbsItemProps {
  /** The label of the item. */
  label?: string;
  /** The start icon of the item. */
  icon?: ReactNode;
  /** The href of the item. */
  href: string;
  /** @ignore */
  isLast?: boolean;
}

export function BreadcrumbsItem({ label, icon, href, isLast }: BreadcrumbsItemProps) {
  return (
    <li className='inline-flex items-center' aria-current={isLast ? 'page' : undefined}>
      <a
        href={href}
        className={clsxMerge(
          'inline-flex cursor-pointer items-center gap-1.5 stroke-gray text-preset-5 leading-none transition-colors duration-300 ease-in-out hover:text-dark',
          {
            'font-medium text-foreground': isLast,
            'font-normal text-neutral-medium': !isLast,
          }
        )}
      >
        {icon}
        {label}
      </a>
    </li>
  );
}

BreadcrumbsItem.displayName = 'BreadcrumbsItem';
