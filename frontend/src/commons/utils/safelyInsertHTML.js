import { $ } from '@/commons/utils/query-selector';

export const safelyInsertHTML = ($container, dir, targetSelector, template) => {
  const target = $(targetSelector);
  if (target) target.remove();

  $container.insertAdjacentHTML(dir, template);
};
