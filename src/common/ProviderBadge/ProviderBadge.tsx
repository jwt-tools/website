import classNames from 'classnames';
import React, {} from 'react';
import { providers } from '../../providers/providers';
import JWTLogo from '../../assets/logoimageJWT.svg';
import './ProviderBadge.scss';

function providerByName(name?: string) {
  if (!name) return;
  return providers.find((provider) => provider.name === name);
}

const ProviderBadge: React.FC<{
  customClass?: string;
  name?: string;
  showUnknownProvider?: boolean;
}> = ({ customClass, name, showUnknownProvider = true }) => {
  const provider = providerByName(name);
  return (
    <div hidden={!showUnknownProvider && !provider} className={classNames('provider', {
      [customClass!]: customClass,
      'provider--unknown': !provider,
      [`${customClass}--unknown`]: !provider && customClass,
    })}>
      <img
        className={classNames('provider__icon', {
          [`${customClass}__icon`]: !!customClass,
        })}
        src={provider?.image || JWTLogo}
        alt="provider"
      />
      {provider?.name ? `${provider.name} token` : 'Unknown token type'}
    </div>
  );
}

export default ProviderBadge;
