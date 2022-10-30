import { useCallback, useEffect, useRef, MutableRef } from 'preact/hooks'

// Based on https://github.com/rcbyr/keen-slider

import KeenSlider, {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
} from "https://esm.sh/keen-slider@6.8.3/keen-slider"


export function equal(v1: any, v2: any): boolean {
    if (v1 === v2) return true
    const t1 = typeof v1
    const t2 = typeof v2
    if (t1 !== t2) return false
    if (t1 === 'object' && v1 !== null && v2 !== null) {
      if (
        v1.length !== v2.length ||
        Object.getOwnPropertyNames(v1).length !==
          Object.getOwnPropertyNames(v2).length
      )
        return false
      for (const prop in v1) {
        if (!equal(v1[prop], v2[prop])) return false
      }
    } else if (t1 === 'function') {
      return v1.toString() === v2.toString()
    } else {
      return false
    }
    return true
  }

function useKeenSlider<
  T extends HTMLElement,
  O = {},
  P = {},
  H extends string = KeenSliderHooks
>(
  options?: KeenSliderOptions<O, P, H>,
  plugins?: KeenSliderPlugin<O, P, H>[]
): [
  (node: T | null) => void,
  MutableRef<KeenSliderInstance<O, P, H> | null>
] {
  const sliderRef = useRef<KeenSliderInstance<O, P, H> | null>(null)
  const optionsCheckedFirst = useRef(false)
  const currentOptions = useRef(options)

  const onRefChange = useCallback((node: T | null) => {
    if (node) {
      currentOptions.current = options
      sliderRef.current = new KeenSlider<O, P, H>(node, options, plugins)
      optionsCheckedFirst.current = false
    } else {
      if (sliderRef.current && sliderRef.current.destroy)
        sliderRef.current.destroy()

      sliderRef.current = null
    }
  }, [])
  useEffect(() => {
    if (equal(currentOptions.current, options)) return
    currentOptions.current = options
    if (sliderRef.current) sliderRef.current.update(currentOptions.current)
  }, [options])

  return [onRefChange, sliderRef]
}

const animation = { duration: 5000, easing: (t: number) => t }

interface SliderProps {
    apps: {
      name: string;
      id: string;
      tagline: string;
    }[];
  }

export default function Slider(props: SliderProps) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
        spacing: 16,
        perView: 3,
    },

    created(s) {
      s.moveToIdx(2, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 2, true, animation)
    },
  })
  return (
    <div ref={sliderRef} class="keen-slider flex w-screen overflow-hidden">
        {props.apps.map((app) => (
              <div class="rounded-lg flex flex-col bg-gray-100 dark:bg-gray-700 p-4 w-64 h-32 justify-center items-center m-4 keen-slider__slide">
                <img
                  src={`https://runcitadel.github.io/old-apps-gallery/${app.id}/icon.svg`}
                  class="h-16 w-16 rounded-xl"
                />
                <h4>{app.name}</h4>
                <h5>{app.tagline}</h5>
              </div>
            ))}
    </div>
  )
}
