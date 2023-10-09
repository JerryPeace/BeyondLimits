// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import serverServices from '@@src/apis/serverServices';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const features = req.query.features ? [...req.query.features] : [];
  delete req.query.features;
  const parameters = { ...req.query, ...req.body };
  let feature: any = serverServices.userAPI[features[0] as never][req.method as never];
  if (!feature) return res.status(404).send('[neptune-web][next-web] not found');
  try {
    const result = await feature(parameters);
    return res.status(200).send(result);
  } catch (error: any) {
    console.error(`[handler] ${error.statusCode} ${error.message}`, parameters);
    return res.status(error.statusCode).send({ message: error.message });
  }
}
