export type CustomComponentType = 'ImageUrl';

interface CustomComponentData {
  component: CustomComponentType;
  props: any;
}

interface IsCustomComponent {
  isCustomComponent: true;
  data: CustomComponentData;
}

interface IsNotCustomComponent {
  isCustomComponent: false;
}

type Result = IsCustomComponent | IsNotCustomComponent;

const shortCodes: Record<string, CustomComponentData> = {
  '[konsultacja]': {
    component: 'ImageUrl',
    props: {
      imageUrl: 'https://placehold.co/864x100?text=brak-zdjecia',
      alt: 'baner',
      href: '/#formularz'
    },
  },
};

export const isCustomComponent = (children: unknown): Result => {
  if (
    Array.isArray(children) &&
    !!children[0] &&
    typeof children[0] === 'object' &&
    'props' in children[0] &&
    !!children[0].props &&
    typeof children[0].props === 'object' &&
    'code' in children[0].props &&
    children[0].props.code === true &&
    'text' in children[0].props &&
    typeof children[0].props.text === 'string'
  ) {
    const text = children[0].props.text.trim();
    if (shortCodes[text]) {
      return {
        isCustomComponent: true,
        data: shortCodes[text],
      };
    }

    try {
      return {
        isCustomComponent: true,
        data: JSON.parse(text),
      };
    } catch (error) {
      console.error(`Incorrect custom component: ${text}`);
      return {
        isCustomComponent: false,
      };
    }
  }

  return {
    isCustomComponent: false,
  };
};
