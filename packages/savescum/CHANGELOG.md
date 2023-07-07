# Changelog

All notable changes to this project will be documented in this file.

## [savescum@0.1.4](https://github.com/jrson83/savescum/releases/tag/savescum@0.1.4) - 2023-07-07

      
### Bug Fixes

- Disable server debug log by default ([ef220a2](https://github.com/jrson83/savescum/commit/ef220a2f0afd55aa1b65d508580c85cb454586a4))          
- Fix options types ([9775bbc](https://github.com/jrson83/savescum/commit/9775bbc23eda64cb624a60ccaacceaadb42f7e57))          
- Fix options types in latest savegame ([11da924](https://github.com/jrson83/savescum/commit/11da924d0791ccd2520bf64b182e3f0a55c79e5e))          
- Update vite, vitest, fix breaking changes ([74f27ef](https://github.com/jrson83/savescum/commit/74f27ef448d384078e375b47ef9d93956e59ef24))          
- Fix port and log args, improve cli ([f9ec8fd](https://github.com/jrson83/savescum/commit/f9ec8fd99e762dc9674a493404abc920c7afc7f9))          

### Features

- Add logging multiple network addresses ([045d22e](https://github.com/jrson83/savescum/commit/045d22e7391c0ad754b3079e72bdf4a5ab44d30e))          
- Prepare path for webinterface ([7797364](https://github.com/jrson83/savescum/commit/779736456855ded40101e359fb8b34b813bddb5d))          
- Prepare savegame for webinterface ([9069b90](https://github.com/jrson83/savescum/commit/9069b9011a2d2c15d173b2291a1c061893f467e6))          
- Add utils tests ([7e26f3c](https://github.com/jrson83/savescum/commit/7e26f3cbda73cf2467e847b95c63735ee34a756f))          
- Add history command ([fbd547e](https://github.com/jrson83/savescum/commit/fbd547e787604c6662b2e45342ee1620b4217c9f))          
- Add ftp tests ([5486fb6](https://github.com/jrson83/savescum/commit/5486fb6db0dffa9a8772beb8e24c880df7ccb346))          
- Improve ftp file check ([142ccdc](https://github.com/jrson83/savescum/commit/142ccdce9b73a13e9222563b8d3ee5fab0a9808a))          
- Add command to ensure remote file exists ([88dd53f](https://github.com/jrson83/savescum/commit/88dd53f9fee8145638ed676688b5d3fb01fd67e4))          

### Refactor

- Improve server ([41aee3d](https://github.com/jrson83/savescum/commit/41aee3debd6086114d6ba9f4cdd4119e71c87ca2))          

### Build

- Update dependency @fastify/static to v6.10.2 ([f598f13](https://github.com/jrson83/savescum/commit/f598f1308977aea03e77f8f1147b899f9d214613))          
- Update dependency fastify to v4.18.0 ([79f90ec](https://github.com/jrson83/savescum/commit/79f90ecb2dc37850b5526c9f9a1d00af4575c012))          
- Update dependency json-schema-to-ts to v2.9.1 ([7e7564b](https://github.com/jrson83/savescum/commit/7e7564b71939551a2d2c7555ce05ea91400bccc3))          
- Update dependency @commander-js/extra-typings to v11 (#26) ([5258ec6](https://github.com/jrson83/savescum/commit/5258ec6b64ab9928cefed2fa8e24378763e63eee))          
- Update dependency commander to v11 (#27) ([4baf455](https://github.com/jrson83/savescum/commit/4baf455fca0d874f7ba7e724bcdf1db4baea9dd1))          
- Update dependency fastify to v4.19.2 ([4b4517e](https://github.com/jrson83/savescum/commit/4b4517e7a5bf29074ac3d74040d84e151a157eff))          


## [savescum@0.1.3](https://github.com/jrson83/savescum/releases/tag/savescum@0.1.3) - 2023-06-02

      
### Bug Fixes

- Regenerate changelog with new config ([f60a328](https://github.com/jrson83/savescum/commit/f60a3288e4c8879ebe5c465da3d7629d33bea57e))          
- Add @savescum/web to external deps ([6dce2a3](https://github.com/jrson83/savescum/commit/6dce2a3785995b0f86097420fb744c4416372777))          
- Use new lib to resolve package dir ([cc87902](https://github.com/jrson83/savescum/commit/cc87902f105746ac63d337a92c92bc9d8bc767fe))          
- Fix fastify await ([1a914f8](https://github.com/jrson83/savescum/commit/1a914f8e41655057abf3c355c0be72b280aababb))          
- Fix client router events ([2272e2f](https://github.com/jrson83/savescum/commit/2272e2f7121ff3041da074551b2b34c8b27c9b90))          

### Features

- Add engines to package ([0fabf13](https://github.com/jrson83/savescum/commit/0fabf13240eaa014fcef43b2eb87689384209797))          

### Build

- Update basic-ftp from 5.0.2 to 5.0.3 ([96d0c2f](https://github.com/jrson83/savescum/commit/96d0c2f3ddee8d26c17fb58f7dd65adaf7e195f0))          
- Update json-schema-to-ts from 2.8.0 to 2.8.2 ([27695fe](https://github.com/jrson83/savescum/commit/27695fe421a12132a0396ff5c960ceedf406557b))          


## [savescum@0.1.2](https://github.com/jrson83/savescum/releases/tag/savescum@0.1.2) - 2023-05-17

      
### Bug Fixes

- Add exit to ftp operations ([54fcb60](https://github.com/jrson83/savescum/commit/54fcb60a9c4f0c30a6df2fc0929a6f6c25802eb1))          
- Add exit to main command ftp operations ([02b2d99](https://github.com/jrson83/savescum/commit/02b2d995851c34c9a947f608f0c4a5bfa7395777))          
- Enable log options for serve ([40e09bf](https://github.com/jrson83/savescum/commit/40e09bf09c788d1d6103e2e5dd18435c200a5a7e))          


## [savescum@0.1.1](https://github.com/jrson83/savescum/releases/tag/savescum@0.1.1) - 2023-05-15

      
### Bug Fixes

- Move web package to dependencies ([db0da1d](https://github.com/jrson83/savescum/commit/db0da1dec84005800373e2409d07358d11b7fa2b))          
- Add function to resolve workspace root closes #1 ([7364daf](https://github.com/jrson83/savescum/commit/7364daf55338475374307558b1ebd074bb8a8c44))          


## [savescum@0.1.0](https://github.com/jrson83/savescum/releases/tag/savescum@0.1.0) - 2023-05-15

      
### Bug Fixes

- Fix wrong error var ([46a0dbe](https://github.com/jrson83/savescum/commit/46a0dbe53cd560ef59943361636330fc659e9fd5))          
- Add missing type ([e89484c](https://github.com/jrson83/savescum/commit/e89484c249e4c1b26a8f440f0f23092d14551fd6))          
- Replace console.error with error ([8b92543](https://github.com/jrson83/savescum/commit/8b9254313f28bbff7f8bd58ab93450235e3492d8))          
- Fix backup path ([cd2e247](https://github.com/jrson83/savescum/commit/cd2e247e7f50e11d3765c0a02b71fb42b1f63cad))          
- Run lint & fmt ([e7d82af](https://github.com/jrson83/savescum/commit/e7d82af308bde8f6cfd3af6deded0f8d83886fd9))          
<!-- generated by sparkee -->
