/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

/*
 * This source file is used to build different shared libraries:
 *
 *  - libmodules-test; it is automatically built by our build system (see the
 *    moz.build in the same directory as this file);
 *
 *  - testUnicodePDB32.dll and testUnicodePDB64.dll; they can be built by
 * compiling this source file using MSVC and setting the target name to be
 * "libmodμles", then renaming the resulting file: cl /Zi modules-test.cpp /link
 * /DLL /OUT:libmodμles.dll cp libmodμles.dll testUnicodePDB*ARCH*.dll
 *
 *  - testNoPDB32.dll and testNoPDB64.dll; they can be built by compiling this
 *    file using MSVC, without enabling generation of a PDB:
 *      cl modules-test.cpp /DLL /OUT:testNoPDB*ARCH*.dll
 *
 * Clearly, for testUnicodePDB and testNoPDB both a 32-bit and a 64-bit version
 * have to be compiled, using the 32-bit and 64-bit MSVC toolchains.
 *
 */

void nothing() {}
