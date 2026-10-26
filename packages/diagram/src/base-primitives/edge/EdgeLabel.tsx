import type { DiagramEdge } from '@likec4/core/types'
import { cx } from '@likec4/styles/css'
import { Box } from '@likec4/styles/jsx'
import { edgeLabel } from '@likec4/styles/recipes'
import type { HTMLMotionProps } from 'motion/react'
import * as m from 'motion/react-m'
import { type ReactNode, forwardRef } from 'react'
import { isTruthy } from 'remeda'
import type { UndefinedOnPartialDeep } from 'type-fest'
import type { BaseEdgePropsWithData } from '../../base/types'
import { useDiagramLocale } from '../../i18n'

type Data = UndefinedOnPartialDeep<
  Pick<
    DiagramEdge,
    | 'label'
    | 'technology'
    | 'locales'
  >
>

type EdgeLabelProps =
  & HTMLMotionProps<'div'>
  & {
    children?: ReactNode
    edgeProps: BaseEdgePropsWithData<Data>
    isSequenceStep?: boolean
    stepNum?: number
    pointerEvents?: 'all' | 'none'
  }

export const EdgeLabel = forwardRef<HTMLDivElement, EdgeLabelProps>((
  {
    edgeProps: {
      id,
      data: {
        label,
        technology,
        locales,
        hovered: isHovered = false,
      },
      selected = false,
      selectable = false,
    },
    isSequenceStep: isStepEdge = false,
    stepNum,
    pointerEvents = 'all',
    className,
    children,
    ...rest
  },
  ref,
) => {
  const locale = useDiagramLocale()
  const edgeLocales = locales
  const localizedLabel = edgeLocales?.[locale]?.label ?? edgeLocales?.[locale]?.title
  const displayLabel = localizedLabel || label
  const displayTechnology = edgeLocales?.[locale]?.technology || technology
  const hasLabel = isTruthy(displayLabel) || isTruthy(displayTechnology)

  return (
    <m.div
      ref={ref}
      className={cx(
        // This class is queried by RelationshipPopover to position near the edge label
        'likec4-edge-label',
        edgeLabel({
          pointerEvents,
          isStepEdge,
          cursor: selectable || isStepEdge ? 'pointer' : 'default',
        }),
        className,
      )}
      data-edge-id={id}
      animate={{
        scale: isHovered && !selected ? 1.06 : 1,
      }}
      {...rest}
    >
      {isStepEdge && stepNum && (
        <Box className={'likec4-edge-label__step-number'}>
          {stepNum}
        </Box>
      )}
      {hasLabel && (
        <Box className={'likec4-edge-label__contents'}>
          {isTruthy(displayLabel) && (
            <Box
              lineClamp={5}
              className={'likec4-edge-label__text'}>
              {displayLabel}
            </Box>
          )}
          {isTruthy(displayTechnology) && (
            <Box className={'likec4-edge-label__technology'}>
              {'[ ' + displayTechnology + ' ]'}
            </Box>
          )}
          {children}
        </Box>
      )}
    </m.div>
  )
})
EdgeLabel.displayName = 'EdgeLabel'
