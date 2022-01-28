import { arrayify } from '@ethersproject/bytes';
import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';

import { hashMessage } from './hasher';
import Signer from './signer';

describe('Signer', () => {
  it('Initialize publicKey and address for new signer instance', async () => {
    const signer = new Signer(signMessageTest.privateKey);

    expect(signer.privateKey).toEqual(signMessageTest.privateKey);
    expect(signer.publicKey).toEqual(signMessageTest.publicKey);
    expect(signer.address).toEqual(signMessageTest.address);
  });

  it('Initialize publicKey and address for new signer instance with byte array', async () => {
    const signer = new Signer(arrayify(signMessageTest.privateKey));

    expect(signer.privateKey).toEqual(signMessageTest.privateKey);
    expect(signer.publicKey).toEqual(signMessageTest.publicKey);
    expect(signer.address).toEqual(signMessageTest.address);
  });

  it('Sign message', async () => {
    const signer = new Signer(signMessageTest.privateKey);
    const signedMessage = signer.sign(hashMessage(signMessageTest.message));

    expect(signedMessage).toEqual(signMessageTest.signedMessage);
  });

  it('Recover publicKey and address from signed message', async () => {
    const signer = new Signer(signMessageTest.privateKey);
    const hashedMessage = hashMessage(signMessageTest.message);
    const signedMessage = signer.sign(hashedMessage);

    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(recoveredAddress).toEqual(signMessageTest.address);
  });
});
