import { useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';

import { EngineDataProps, MyCarLayoutContextProps } from '@/types/trim';
import { useFetch } from '@/hooks/useFetch';
import { useSelectIndex } from '@/hooks/useSelectedIndex';

import { TrimCard } from '@/components/common/TrimCard';
import { MyCarImageBox } from '@/components/Trim/MyCarImageBox';
import { MyCarDescription } from '@/components/common/MyCarDescription';

import * as Styled from './style';

const initialData = {
  engines: [
    {
      id: 0,
      name: '',
      additionalPrice: 0,
      description: '',
      maximumPower: '',
      maximumTorque: '',
      imageUrl: '',
    },
  ],
};

export function Engine() {
  const {
    data: { engines },
  } = useFetch<EngineDataProps>({
    defaultValue: initialData,
    url: '/car/model/1/engine',
  });

  const [selectedIndex, handleSetIndex] = useSelectIndex();
  const { imageUrl, additionalPrice, name } = engines[selectedIndex];

  const {
    handleTrimOption,
    myCar: { engine },
  } = useOutletContext<MyCarLayoutContextProps>();

  function handleCardClick(additionalPrice: number, id: number, name: string, index: number) {
    return () => {
      handleSetIndex(index)();
      handleTrimOption({ key: 'engine', name, additionalPrice, id });
    };
  }

  useEffect(() => {
    if (engine.name === '') {
      const { name, additionalPrice, id } = engines[0];

      handleTrimOption({ key: 'engine', name, additionalPrice, id });

      return;
    }

    const index = engines.findIndex(({ name }) => name === engine.name);
    index !== -1 && handleSetIndex(index)();
  }, [engines]);

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Box>
          <MyCarImageBox hasOption={false} images={imageUrl} />
          <MyCarDescription title={name} price={additionalPrice} hasTag={false} />
        </Styled.Box>
        <Styled.CardBox>
          {engines.map(({ name, additionalPrice, description, maximumPower, maximumTorque, id }, index) => (
            <Styled.Enclosure key={id} onClick={handleCardClick(additionalPrice, id, name, index)}>
              <TrimCard
                isActive={index === selectedIndex}
                title={name}
                price={additionalPrice}
                description={description}
                hasEngineInfo={true}
                power={maximumPower}
                torque={maximumTorque}
              />
            </Styled.Enclosure>
          ))}
        </Styled.CardBox>
      </Styled.Wrapper>
    </Styled.Container>
  );
}
