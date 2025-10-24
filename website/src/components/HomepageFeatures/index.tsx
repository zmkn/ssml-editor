import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  description: ReactNode;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate
        id="homepage.feature.easy-to-use.title"
        description="Homepage feature item with title easy to use"
      >
        Easy to use
      </Translate>
    ),
    description: (
      <Translate
        id="homepage.feature.easy-to-use.description"
        description="Homepage feature item with description easy to use"
      >
        Provide rich and flexible configuration options along with comprehensive
        and easy-to-understand documentation tutorials, helping beginners
        quickly get started and achieve efficient integration and usage.
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.feature.power.title"
        description="Homepage feature item with title power"
      >
        Powered by Vue3
      </Translate>
    ),
    description: (
      <Translate
        id="homepage.feature.power.description"
        description="Homepage feature item with description power"
      >
        Developed based on Vue3, it extends the Slate Vue3 components to create
        a convenient, user-friendly, and highly customizable SSML editor
        component, balancing development efficiency and user experience.
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.feature.easy-to-extend.title"
        description="Homepage feature item with title easy to extend"
      >
        Easy to extend
      </Translate>
    ),
    description: (
      <Translate
        id="homepage.feature.easy-to-extend.description"
        description="Homepage feature item with description easy to extend"
      >
        Provide developers with comprehensive extensibility: configurable menus,
        modules and plugins, standardized and serialization interfaces, making
        development more streamlined and liberated.
      </Translate>
    ),
  },
];

function Feature({ title, description, Svg }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      {Svg ? (
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
      ) : (
        ''
      )}
      <div className="padding-horiz--md">
        <Heading as="h3" className="text--center">
          {title}
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
